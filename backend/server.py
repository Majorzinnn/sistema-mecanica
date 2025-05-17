from fastapi import FastAPI, APIRouter, HTTPException, Body, Query, BackgroundTasks, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
import tarfile
import tempfile
import zipfile
import shutil
import asyncio
from datetime import datetime, date
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'workshop_db')]

# Create the main app without a prefix
app = FastAPI(title="Mechanical Workshop Management System API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enum for service status
class ServiceStatus(str, Enum):
    DRAFT = "draft"
    WAITING_APPROVAL = "waiting_approval"
    APPROVED = "approved"
    IN_PROGRESS = "in_progress"
    WAITING_PARTS = "waiting_parts"
    COMPLETED = "completed"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

# Define Models
class Client(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    document: str  # CPF/CNPJ
    email: Optional[str] = None
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    birth_date: Optional[date] = None
    notes: Optional[str] = None
    photo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ClientCreate(BaseModel):
    name: str
    document: str
    email: Optional[str] = None
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    birth_date: Optional[date] = None
    notes: Optional[str] = None
    photo_url: Optional[str] = None

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    document: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    birth_date: Optional[date] = None
    notes: Optional[str] = None
    photo_url: Optional[str] = None

class Vehicle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_id: str
    license_plate: str
    make: str
    model: str
    year: int
    color: Optional[str] = None
    vin: Optional[str] = None  # Vehicle Identification Number
    mileage: Optional[int] = None
    fuel_type: Optional[str] = None
    notes: Optional[str] = None
    photos: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class VehicleCreate(BaseModel):
    client_id: str
    license_plate: str
    make: str
    model: str
    year: int
    color: Optional[str] = None
    vin: Optional[str] = None
    mileage: Optional[int] = None
    fuel_type: Optional[str] = None
    notes: Optional[str] = None
    photos: List[str] = []

class VehicleUpdate(BaseModel):
    license_plate: Optional[str] = None
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    color: Optional[str] = None
    vin: Optional[str] = None
    mileage: Optional[int] = None
    fuel_type: Optional[str] = None
    notes: Optional[str] = None
    photos: Optional[List[str]] = None

class Part(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    code: str
    name: str
    description: Optional[str] = None
    supplier: Optional[str] = None
    cost_price: float
    sale_price: float
    quantity: int
    min_quantity: int = 0
    unit: str = "unit"  # unit, liter, meter, etc.
    location: Optional[str] = None
    photo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PartCreate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    supplier: Optional[str] = None
    cost_price: float
    sale_price: float
    quantity: int
    min_quantity: int = 0
    unit: str = "unit"
    location: Optional[str] = None
    photo_url: Optional[str] = None

class PartUpdate(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    supplier: Optional[str] = None
    cost_price: Optional[float] = None
    sale_price: Optional[float] = None
    quantity: Optional[int] = None
    min_quantity: Optional[int] = None
    unit: Optional[str] = None
    location: Optional[str] = None
    photo_url: Optional[str] = None

class ServiceItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    description: str
    quantity: float = 1
    unit_price: float
    total: float
    type: str = "service"  # service or part

class QuoteOrOrder(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # "quote" or "order"
    number: str  # Auto-generated quote/order number
    client_id: str
    vehicle_id: str
    date: datetime = Field(default_factory=datetime.utcnow)
    status: ServiceStatus = ServiceStatus.DRAFT
    items: List[ServiceItem] = []
    labor_cost: float = 0
    parts_cost: float = 0
    discount: float = 0
    tax: float = 0
    total: float = 0
    notes: Optional[str] = None
    photos: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # For work orders only
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    mechanic: Optional[str] = None
    diagnosis: Optional[str] = None
    checklist: Dict[str, bool] = {}

class QuoteOrOrderCreate(BaseModel):
    type: str
    client_id: str
    vehicle_id: str
    items: List[ServiceItem] = []
    labor_cost: float = 0
    parts_cost: float = 0
    discount: float = 0
    tax: float = 0
    notes: Optional[str] = None
    photos: List[str] = []
    
    # For work orders only
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    mechanic: Optional[str] = None
    diagnosis: Optional[str] = None
    checklist: Dict[str, bool] = {}

class QuoteOrOrderUpdate(BaseModel):
    status: Optional[ServiceStatus] = None
    items: Optional[List[ServiceItem]] = None
    labor_cost: Optional[float] = None
    parts_cost: Optional[float] = None
    discount: Optional[float] = None
    tax: Optional[float] = None
    total: Optional[float] = None
    notes: Optional[str] = None
    photos: Optional[List[str]] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    mechanic: Optional[str] = None
    diagnosis: Optional[str] = None
    checklist: Optional[Dict[str, bool]] = None

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_id: str
    vehicle_id: str
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    status: str = "scheduled"  # scheduled, in-progress, completed, cancelled
    mechanic: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AppointmentCreate(BaseModel):
    client_id: str
    vehicle_id: str
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    status: str = "scheduled"
    mechanic: Optional[str] = None

class AppointmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    status: Optional[str] = None
    mechanic: Optional[str] = None

# Client endpoints
@api_router.post("/clients", response_model=Client)
async def create_client(client: ClientCreate):
    client_dict = client.dict()
    client_obj = Client(**client_dict)
    result = await db.clients.insert_one(client_obj.dict())
    return client_obj

@api_router.get("/clients", response_model=List[Client])
async def get_clients(search: Optional[str] = None):
    query = {}
    if search:
        query = {
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
                {"document": {"$regex": search, "$options": "i"}},
                {"phone": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}}
            ]
        }
    clients = await db.clients.find(query).to_list(1000)
    return [Client(**client) for client in clients]

@api_router.get("/clients/{client_id}", response_model=Client)
async def get_client(client_id: str):
    client = await db.clients.find_one({"id": client_id})
    if not client:
        raise HTTPException(status_code=404, detail=f"Client {client_id} not found")
    return Client(**client)

@api_router.put("/clients/{client_id}", response_model=Client)
async def update_client(client_id: str, client_update: ClientUpdate):
    # Get the existing client
    existing_client = await db.clients.find_one({"id": client_id})
    if not existing_client:
        raise HTTPException(status_code=404, detail=f"Client {client_id} not found")
    
    # Update only the fields that are not None
    update_data = {k: v for k, v in client_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the client in the database
    await db.clients.update_one({"id": client_id}, {"$set": update_data})
    
    # Get and return the updated client
    updated_client = await db.clients.find_one({"id": client_id})
    return Client(**updated_client)

@api_router.delete("/clients/{client_id}")
async def delete_client(client_id: str):
    # First check if client exists
    client = await db.clients.find_one({"id": client_id})
    if not client:
        raise HTTPException(status_code=404, detail=f"Client {client_id} not found")
    
    # Check if there are vehicles associated with this client
    vehicle_count = await db.vehicles.count_documents({"client_id": client_id})
    if vehicle_count > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete client {client_id}, there are {vehicle_count} vehicles associated with this client"
        )
    
    # Delete the client
    delete_result = await db.clients.delete_one({"id": client_id})
    if delete_result.deleted_count:
        return {"message": f"Client {client_id} deleted successfully"}
    raise HTTPException(status_code=500, detail=f"Failed to delete client {client_id}")

# Vehicle endpoints
@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle: VehicleCreate):
    # Check if client exists
    client = await db.clients.find_one({"id": vehicle.client_id})
    if not client:
        raise HTTPException(status_code=404, detail=f"Client {vehicle.client_id} not found")
    
    vehicle_dict = vehicle.dict()
    vehicle_obj = Vehicle(**vehicle_dict)
    await db.vehicles.insert_one(vehicle_obj.dict())
    return vehicle_obj

@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles(client_id: Optional[str] = None, search: Optional[str] = None):
    query = {}
    if client_id:
        query["client_id"] = client_id
    if search:
        query["$or"] = [
            {"license_plate": {"$regex": search, "$options": "i"}},
            {"make": {"$regex": search, "$options": "i"}},
            {"model": {"$regex": search, "$options": "i"}},
            {"vin": {"$regex": search, "$options": "i"}}
        ]
    vehicles = await db.vehicles.find(query).to_list(1000)
    return [Vehicle(**vehicle) for vehicle in vehicles]

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle {vehicle_id} not found")
    return Vehicle(**vehicle)

@api_router.put("/vehicles/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(vehicle_id: str, vehicle_update: VehicleUpdate):
    # Check if vehicle exists
    existing_vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not existing_vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle {vehicle_id} not found")
    
    # Update only the fields that are not None
    update_data = {k: v for k, v in vehicle_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the vehicle in the database
    await db.vehicles.update_one({"id": vehicle_id}, {"$set": update_data})
    
    # Get and return the updated vehicle
    updated_vehicle = await db.vehicles.find_one({"id": vehicle_id})
    return Vehicle(**updated_vehicle)

@api_router.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: str):
    # First check if vehicle exists
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle {vehicle_id} not found")
    
    # Check if there are quotes or orders associated with this vehicle
    service_count = await db.quotes_orders.count_documents({"vehicle_id": vehicle_id})
    if service_count > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete vehicle {vehicle_id}, there are {service_count} services associated with this vehicle"
        )
    
    # Delete the vehicle
    delete_result = await db.vehicles.delete_one({"id": vehicle_id})
    if delete_result.deleted_count:
        return {"message": f"Vehicle {vehicle_id} deleted successfully"}
    raise HTTPException(status_code=500, detail=f"Failed to delete vehicle {vehicle_id}")

# Inventory/Parts endpoints
@api_router.post("/parts", response_model=Part)
async def create_part(part: PartCreate):
    # Check if part with same code already exists
    existing_part = await db.parts.find_one({"code": part.code})
    if existing_part:
        raise HTTPException(status_code=400, detail=f"Part with code {part.code} already exists")
    
    part_dict = part.dict()
    part_obj = Part(**part_dict)
    await db.parts.insert_one(part_obj.dict())
    return part_obj

@api_router.get("/parts", response_model=List[Part])
async def get_parts(search: Optional[str] = None, low_stock: bool = False):
    query = {}
    if search:
        query["$or"] = [
            {"code": {"$regex": search, "$options": "i"}},
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"supplier": {"$regex": search, "$options": "i"}}
        ]
    if low_stock:
        query["$expr"] = {"$lte": ["$quantity", "$min_quantity"]}
    
    parts = await db.parts.find(query).to_list(1000)
    return [Part(**part) for part in parts]

@api_router.get("/parts/{part_id}", response_model=Part)
async def get_part(part_id: str):
    part = await db.parts.find_one({"id": part_id})
    if not part:
        raise HTTPException(status_code=404, detail=f"Part {part_id} not found")
    return Part(**part)

@api_router.put("/parts/{part_id}", response_model=Part)
async def update_part(part_id: str, part_update: PartUpdate):
    # Check if part exists
    existing_part = await db.parts.find_one({"id": part_id})
    if not existing_part:
        raise HTTPException(status_code=404, detail=f"Part {part_id} not found")
    
    # If code is being updated, check if new code already exists
    if part_update.code is not None and part_update.code != existing_part["code"]:
        code_part = await db.parts.find_one({"code": part_update.code})
        if code_part and code_part["id"] != part_id:
            raise HTTPException(status_code=400, detail=f"Part with code {part_update.code} already exists")
    
    # Update only the fields that are not None
    update_data = {k: v for k, v in part_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the part in the database
    await db.parts.update_one({"id": part_id}, {"$set": update_data})
    
    # Get and return the updated part
    updated_part = await db.parts.find_one({"id": part_id})
    return Part(**updated_part)

@api_router.delete("/parts/{part_id}")
async def delete_part(part_id: str):
    # First check if part exists
    part = await db.parts.find_one({"id": part_id})
    if not part:
        raise HTTPException(status_code=404, detail=f"Part {part_id} not found")
    
    # Delete the part
    delete_result = await db.parts.delete_one({"id": part_id})
    if delete_result.deleted_count:
        return {"message": f"Part {part_id} deleted successfully"}
    raise HTTPException(status_code=500, detail=f"Failed to delete part {part_id}")

# Quote and Work Order endpoints
@api_router.post("/services", response_model=QuoteOrOrder)
async def create_service(service: QuoteOrOrderCreate):
    # Check if client exists
    client = await db.clients.find_one({"id": service.client_id})
    if not client:
        raise HTTPException(status_code=404, detail=f"Client {service.client_id} not found")
    
    # Check if vehicle exists
    vehicle = await db.vehicles.find_one({"id": service.vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle {service.vehicle_id} not found")
    
    # Generate a number for this service
    count = await db.quotes_orders.count_documents({})
    service_number = f"{service.type.upper()}-{str(count + 1).zfill(6)}"
    
    # Calculate total
    total = service.labor_cost + service.parts_cost - service.discount + service.tax
    
    service_dict = service.dict()
    service_dict.update({
        "number": service_number,
        "total": total,
        "status": ServiceStatus.DRAFT
    })
    
    service_obj = QuoteOrOrder(**service_dict)
    await db.quotes_orders.insert_one(service_obj.dict())
    return service_obj

@api_router.get("/services", response_model=List[QuoteOrOrder])
async def get_services(
    service_type: Optional[str] = None, 
    client_id: Optional[str] = None,
    vehicle_id: Optional[str] = None,
    status: Optional[ServiceStatus] = None
):
    query = {}
    if service_type:
        query["type"] = service_type
    if client_id:
        query["client_id"] = client_id
    if vehicle_id:
        query["vehicle_id"] = vehicle_id
    if status:
        query["status"] = status
    
    services = await db.quotes_orders.find(query).to_list(1000)
    return [QuoteOrOrder(**service) for service in services]

@api_router.get("/services/{service_id}", response_model=QuoteOrOrder)
async def get_service(service_id: str):
    service = await db.quotes_orders.find_one({"id": service_id})
    if not service:
        raise HTTPException(status_code=404, detail=f"Service {service_id} not found")
    return QuoteOrOrder(**service)

@api_router.put("/services/{service_id}", response_model=QuoteOrOrder)
async def update_service(service_id: str, service_update: QuoteOrOrderUpdate):
    # Check if service exists
    existing_service = await db.quotes_orders.find_one({"id": service_id})
    if not existing_service:
        raise HTTPException(status_code=404, detail=f"Service {service_id} not found")
    
    # Update only the fields that are not None
    update_data = {k: v for k, v in service_update.dict().items() if v is not None}
    
    # If items are updated, recalculate total
    if service_update.items is not None or service_update.labor_cost is not None or service_update.parts_cost is not None or service_update.discount is not None or service_update.tax is not None:
        labor_cost = service_update.labor_cost if service_update.labor_cost is not None else existing_service["labor_cost"]
        parts_cost = service_update.parts_cost if service_update.parts_cost is not None else existing_service["parts_cost"]
        discount = service_update.discount if service_update.discount is not None else existing_service["discount"]
        tax = service_update.tax if service_update.tax is not None else existing_service["tax"]
        
        update_data["total"] = labor_cost + parts_cost - discount + tax
    
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the service in the database
    await db.quotes_orders.update_one({"id": service_id}, {"$set": update_data})
    
    # Get and return the updated service
    updated_service = await db.quotes_orders.find_one({"id": service_id})
    return QuoteOrOrder(**updated_service)

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    # First check if service exists
    service = await db.quotes_orders.find_one({"id": service_id})
    if not service:
        raise HTTPException(status_code=404, detail=f"Service {service_id} not found")
    
    # Only delete if service is in DRAFT or CANCELLED status
    if service["status"] not in [ServiceStatus.DRAFT, ServiceStatus.CANCELLED]:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete service {service_id} with status {service['status']}, only DRAFT or CANCELLED services can be deleted"
        )
    
    # Delete the service
    delete_result = await db.quotes_orders.delete_one({"id": service_id})
    if delete_result.deleted_count:
        return {"message": f"Service {service_id} deleted successfully"}
    raise HTTPException(status_code=500, detail=f"Failed to delete service {service_id}")

# Appointment endpoints
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    # Check if client exists
    client = await db.clients.find_one({"id": appointment.client_id})
    if not client:
        raise HTTPException(status_code=404, detail=f"Client {appointment.client_id} not found")
    
    # Check if vehicle exists
    vehicle = await db.vehicles.find_one({"id": appointment.vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle {appointment.vehicle_id} not found")
    
    appointment_dict = appointment.dict()
    appointment_obj = Appointment(**appointment_dict)
    await db.appointments.insert_one(appointment_obj.dict())
    return appointment_obj

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments(
    client_id: Optional[str] = None,
    vehicle_id: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    status: Optional[str] = None
):
    query = {}
    if client_id:
        query["client_id"] = client_id
    if vehicle_id:
        query["vehicle_id"] = vehicle_id
    if status:
        query["status"] = status
    
    date_query = {}
    if start_date:
        date_query["$gte"] = start_date
    if end_date:
        date_query["$lte"] = end_date
    
    if date_query:
        query["start_time"] = date_query
    
    appointments = await db.appointments.find(query).to_list(1000)
    return [Appointment(**appointment) for appointment in appointments]

@api_router.get("/appointments/{appointment_id}", response_model=Appointment)
async def get_appointment(appointment_id: str):
    appointment = await db.appointments.find_one({"id": appointment_id})
    if not appointment:
        raise HTTPException(status_code=404, detail=f"Appointment {appointment_id} not found")
    return Appointment(**appointment)

@api_router.put("/appointments/{appointment_id}", response_model=Appointment)
async def update_appointment(appointment_id: str, appointment_update: AppointmentUpdate):
    # Check if appointment exists
    existing_appointment = await db.appointments.find_one({"id": appointment_id})
    if not existing_appointment:
        raise HTTPException(status_code=404, detail=f"Appointment {appointment_id} not found")
    
    # Update only the fields that are not None
    update_data = {k: v for k, v in appointment_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the appointment in the database
    await db.appointments.update_one({"id": appointment_id}, {"$set": update_data})
    
    # Get and return the updated appointment
    updated_appointment = await db.appointments.find_one({"id": appointment_id})
    return Appointment(**updated_appointment)

@api_router.delete("/appointments/{appointment_id}")
async def delete_appointment(appointment_id: str):
    # First check if appointment exists
    appointment = await db.appointments.find_one({"id": appointment_id})
    if not appointment:
        raise HTTPException(status_code=404, detail=f"Appointment {appointment_id} not found")
    
    # Delete the appointment
    delete_result = await db.appointments.delete_one({"id": appointment_id})
    if delete_result.deleted_count:
        return {"message": f"Appointment {appointment_id} deleted successfully"}
    raise HTTPException(status_code=500, detail=f"Failed to delete appointment {appointment_id}")

# Statistics and dashboard data
@api_router.get("/statistics/dashboard")
async def get_dashboard_stats():
    # Count active clients
    client_count = await db.clients.count_documents({})
    
    # Count active vehicles
    vehicle_count = await db.vehicles.count_documents({})
    
    # Count quotes and work orders by status
    pipeline = [
        {"$group": {
            "_id": {
                "type": "$type",
                "status": "$status"
            },
            "count": {"$sum": 1}
        }}
    ]
    status_counts = await db.quotes_orders.aggregate(pipeline).to_list(1000)
    
    # Format status counts
    formatted_counts = {}
    for item in status_counts:
        service_type = item["_id"]["type"]
        status = item["_id"]["status"]
        count = item["count"]
        
        if service_type not in formatted_counts:
            formatted_counts[service_type] = {}
        
        formatted_counts[service_type][status] = count
    
    # Count today's appointments
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = datetime.utcnow().replace(hour=23, minute=59, second=59, microsecond=999999)
    today_appointments = await db.appointments.count_documents({
        "start_time": {"$gte": today_start, "$lte": today_end}
    })
    
    # Get low stock parts
    low_stock_count = await db.parts.count_documents({"$expr": {"$lte": ["$quantity", "$min_quantity"]}})
    
    # Return all statistics
    return {
        "clients": client_count,
        "vehicles": vehicle_count,
        "services": formatted_counts,
        "today_appointments": today_appointments,
        "low_stock_parts": low_stock_count
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    logger.info("Starting up the application...")
    # Create indexes for faster queries
    await db.clients.create_index("id", unique=True)
    await db.vehicles.create_index("id", unique=True)
    await db.vehicles.create_index("client_id")
    await db.parts.create_index("id", unique=True)
    await db.parts.create_index("code", unique=True)
    await db.quotes_orders.create_index("id", unique=True)
    await db.quotes_orders.create_index("client_id")
    await db.quotes_orders.create_index("vehicle_id")
    await db.appointments.create_index("id", unique=True)
    await db.appointments.create_index("client_id")
    await db.appointments.create_index("vehicle_id")
    await db.appointments.create_index("start_time")
    logger.info("Application startup completed")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Shutting down the application...")
