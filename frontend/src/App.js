import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import axios from "axios";
import "./App.css";

// API Configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Component for the sidebar navigation
const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar bg-gray-900 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto shadow-lg">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold">EUROPA</h1>
        <p className="text-sm text-gray-400">Gestão de Oficina Mecânica</p>
      </div>
      
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center p-3 text-lg ${isActive('/') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/clients" 
              className={`flex items-center p-3 text-lg ${isActive('/clients') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Clientes
            </Link>
          </li>
          <li>
            <Link 
              to="/vehicles" 
              className={`flex items-center p-3 text-lg ${isActive('/vehicles') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0011 5H8.05A2.5 2.5 0 005 7H3a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 013.9 0H9a1 1 0 001-1h2a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
              </svg>
              Veículos
            </Link>
          </li>
          <li>
            <Link 
              to="/quotes" 
              className={`flex items-center p-3 text-lg ${isActive('/quotes') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Orçamentos
            </Link>
          </li>
          <li>
            <Link 
              to="/orders" 
              className={`flex items-center p-3 text-lg ${isActive('/orders') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
              </svg>
              Ordens de Serviço
            </Link>
          </li>
          <li>
            <Link 
              to="/inventory" 
              className={`flex items-center p-3 text-lg ${isActive('/inventory') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Estoque
            </Link>
          </li>
          <li>
            <Link 
              to="/schedule" 
              className={`flex items-center p-3 text-lg ${isActive('/schedule') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Agenda
            </Link>
          </li>
          <li>
            <Link 
              to="/reports" 
              className={`flex items-center p-3 text-lg ${isActive('/reports') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Relatórios
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/statistics/dashboard`);
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Erro ao carregar os dados do dashboard");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erro! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Placeholder data if API doesn't return anything yet
  const dashboardData = stats || {
    clients: 0,
    vehicles: 0,
    services: { 
      quote: { draft: 0, waiting_approval: 0, approved: 0, cancelled: 0 },
      order: { draft: 0, in_progress: 0, waiting_parts: 0, completed: 0, delivered: 0, cancelled: 0 }
    },
    today_appointments: 0,
    low_stock_parts: 0
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Quick Stats Cards */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.clients}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Veículos</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.vehicles}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0011 5H8.05A2.5 2.5 0 005 7H3a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 013.9 0H9a1 1 0 001-1h2a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Agendamentos Hoje</p>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.today_appointments}</p>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Service Status Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Status dos Orçamentos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2 rounded-l-lg">Status</th>
                  <th className="px-4 py-2 rounded-r-lg text-right">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Em elaboração</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.quote?.draft || 0}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Aguardando aprovação</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.quote?.waiting_approval || 0}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Aprovados</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.quote?.approved || 0}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Cancelados</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.quote?.cancelled || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Status das Ordens de Serviço</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2 rounded-l-lg">Status</th>
                  <th className="px-4 py-2 rounded-r-lg text-right">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Em elaboração</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.order?.draft || 0}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Em andamento</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.order?.in_progress || 0}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Aguardando peças</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.order?.waiting_parts || 0}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Concluídas</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.order?.completed || 0}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Entregues</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.order?.delivered || 0}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Canceladas</td>
                  <td className="px-4 py-3 text-right">{dashboardData.services?.order?.cancelled || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Alertas de Estoque</h2>
            <Link to="/inventory" className="text-blue-600 hover:text-blue-800 text-sm">Ver todos</Link>
          </div>
          
          {dashboardData.low_stock_parts > 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    {dashboardData.low_stock_parts} {dashboardData.low_stock_parts === 1 ? 'item está' : 'itens estão'} com estoque baixo
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Todos os itens estão com estoque adequado
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/clients/new" className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Novo Cliente
            </Link>
            <Link to="/vehicles/new" className="inline-flex items-center py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0011 5H8.05A2.5 2.5 0 005 7H3a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 013.9 0H9a1 1 0 001-1h2a1 1 0 00-1 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
              </svg>
              Novo Veículo
            </Link>
            <Link to="/quotes/new" className="inline-flex items-center py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Novo Orçamento
            </Link>
            <Link to="/schedule/new" className="inline-flex items-center py-2 px-4 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Novo Agendamento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client management components - Placeholder for now
const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/clients${search ? `?search=${search}` : ''}`);
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setLoading(false);
      }
    };

    fetchClients();
  }, [search]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <Link 
          to="/clients/new" 
          className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Cliente
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
              placeholder="Buscar por nome, CPF/CNPJ, telefone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {clients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">Nome</th>
                    <th className="px-6 py-3">CPF/CNPJ</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                      <td className="px-6 py-4">{client.document}</td>
                      <td className="px-6 py-4">{client.phone}</td>
                      <td className="px-6 py-4">{client.email || "-"}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/clients/${client.id}`} className="text-blue-600 hover:text-blue-900">
                            Ver
                          </Link>
                          <Link to={`/clients/${client.id}/edit`} className="text-green-600 hover:text-green-900">
                            Editar
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">Nenhum cliente encontrado{search && " para a busca realizada"}.</p>
              <Link to="/clients/new" className="inline-block mt-3 text-blue-600 hover:text-blue-800">
                Adicionar novo cliente
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Placeholders for the rest of the views
const ClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [client, setClient] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    notes: ''
  });
  
  const isEditing = !!id;

  // Fetch client data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchClient = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${API}/clients/${id}`);
          setClient(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching client:", error);
          setError("Erro ao carregar dados do cliente.");
          setIsLoading(false);
        }
      };
      
      fetchClient();
    }
  }, [id, isEditing]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!client.name || !client.document || !client.phone) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      if (isEditing) {
        await axios.put(`${API}/clients/${id}`, client);
      } else {
        await axios.post(`${API}/clients`, client);
      }
      
      navigate('/clients');
    } catch (error) {
      console.error("Error saving client:", error);
      setError("Erro ao salvar cliente. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };

  // Brazil states for dropdown
  const brazilStates = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" }
  ];

  if (isLoading && isEditing) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
        </h1>
        <button
          onClick={() => navigate('/clients')}
          className="inline-flex items-center py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={client.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nome completo do cliente"
                required
              />
            </div>

            {/* Document (CPF/CNPJ) */}
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                CPF/CNPJ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="document"
                name="document"
                value={client.document}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={client.phone}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={client.email || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="email@exemplo.com"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={client.address || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Rua, número, complemento"
              />
            </div>

            {/* Zip code */}
            <div>
              <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                CEP
              </label>
              <input
                type="text"
                id="zip_code"
                name="zip_code"
                value={client.zip_code || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="00000-000"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={client.city || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nome da cidade"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="state"
                name="state"
                value={client.state || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Selecione um estado</option>
                {brazilStates.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                id="notes"
                name="notes"
                value={client.notes || ''}
                onChange={handleChange}
                rows="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Informações adicionais sobre o cliente"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="mr-2 py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                'Salvar Cliente'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const ClientDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Cliente</h1><p>Em construção...</p></div>;
// Vehicle management components
const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        
        // Fetch clients for the filter dropdown
        const clientsResponse = await axios.get(`${API}/clients`);
        setClients(clientsResponse.data);
        
        // Build query string for filters
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (clientFilter) queryParams.append('client_id', clientFilter);
        
        // Fetch vehicles with filters
        const vehiclesResponse = await axios.get(`${API}/vehicles?${queryParams.toString()}`);
        setVehicles(vehiclesResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [search, clientFilter]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Veículos</h1>
        <Link 
          to="/vehicles/new" 
          className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Veículo
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
              placeholder="Buscar por placa, marca, modelo..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
            >
              <option value="">Todos os Clientes</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {vehicles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">Placa</th>
                    <th className="px-6 py-3">Marca/Modelo</th>
                    <th className="px-6 py-3">Ano</th>
                    <th className="px-6 py-3">Proprietário</th>
                    <th className="px-6 py-3">Quilometragem</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => {
                    // Find the client for this vehicle
                    const client = clients.find(c => c.id === vehicle.client_id) || { name: 'Cliente não encontrado' };
                    
                    return (
                      <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{vehicle.license_plate}</td>
                        <td className="px-6 py-4">{vehicle.make} {vehicle.model}</td>
                        <td className="px-6 py-4">{vehicle.year}</td>
                        <td className="px-6 py-4">{client.name}</td>
                        <td className="px-6 py-4">{vehicle.mileage ? `${vehicle.mileage} km` : '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Link to={`/vehicles/${vehicle.id}`} className="text-blue-600 hover:text-blue-900">
                              Ver
                            </Link>
                            <Link to={`/vehicles/${vehicle.id}/edit`} className="text-green-600 hover:text-green-900">
                              Editar
                            </Link>
                            <Link to={`/vehicles/${vehicle.id}/history`} className="text-purple-600 hover:text-purple-900">
                              Histórico
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <p className="text-gray-500">Nenhum veículo encontrado{(search || clientFilter) && " para os filtros selecionados"}.</p>
              <Link to="/vehicles/new" className="inline-block mt-3 text-blue-600 hover:text-blue-800">
                Adicionar novo veículo
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const VehicleForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Veículo</h1><p>Em construção...</p></div>;
const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [client, setClient] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch vehicle data
        const vehicleResponse = await axios.get(`${API}/vehicles/${id}`);
        setVehicle(vehicleResponse.data);
        
        // Fetch client data
        const clientResponse = await axios.get(`${API}/clients/${vehicleResponse.data.client_id}`);
        setClient(clientResponse.data);
        
        // Fetch services for this vehicle
        const servicesResponse = await axios.get(`${API}/services?vehicle_id=${id}`);
        setServices(servicesResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setError("Erro ao carregar os detalhes do veículo.");
        setLoading(false);
      }
    };
    
    fetchVehicleDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Atenção! </strong>
          <span className="block sm:inline">Veículo não encontrado.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{vehicle.make} {vehicle.model}</h1>
          <p className="text-gray-600">Placa: {vehicle.license_plate}</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            to={`/vehicles/${id}/edit`} 
            className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar
          </Link>
          <Link 
            to={`/quotes/new?vehicle=${id}`} 
            className="inline-flex items-center py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Novo Orçamento
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Vehicle Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Informações do Veículo</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Marca:</div>
              <div className="font-medium">{vehicle.make}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Modelo:</div>
              <div className="font-medium">{vehicle.model}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Ano:</div>
              <div className="font-medium">{vehicle.year}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Placa:</div>
              <div className="font-medium">{vehicle.license_plate}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Cor:</div>
              <div className="font-medium">{vehicle.color || '-'}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Quilometragem:</div>
              <div className="font-medium">{vehicle.mileage ? `${vehicle.mileage} km` : '-'}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Chassi (VIN):</div>
              <div className="font-medium">{vehicle.vin || '-'}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Combustível:</div>
              <div className="font-medium">{vehicle.fuel_type || '-'}</div>
            </div>
          </div>
        </div>

        {/* Owner Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Proprietário</h2>
          {client ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Nome:</div>
                <div className="font-medium">{client.name}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">CPF/CNPJ:</div>
                <div className="font-medium">{client.document}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Telefone:</div>
                <div className="font-medium">{client.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-gray-600">Email:</div>
                <div className="font-medium">{client.email || '-'}</div>
              </div>
              <div className="mt-4">
                <Link to={`/clients/${client.id}`} className="text-blue-600 hover:text-blue-800">
                  Ver perfil completo
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Informações do proprietário não disponíveis.</p>
          )}
        </div>

        {/* Service Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo de Serviços</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Total de Serviços:</div>
              <div className="font-medium">{services.length}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Orçamentos:</div>
              <div className="font-medium">{services.filter(s => s.type === 'quote').length}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Ordens de Serviço:</div>
              <div className="font-medium">{services.filter(s => s.type === 'order').length}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-gray-600">Última Visita:</div>
              <div className="font-medium">
                {services.length > 0 
                  ? new Date(Math.max(...services.map(s => new Date(s.created_at)))).toLocaleDateString('pt-BR')
                  : 'Nenhuma visita'
                }
              </div>
            </div>
            {vehicle.notes && (
              <div className="mt-4">
                <h3 className="text-gray-600 font-medium">Observações:</h3>
                <p className="text-gray-800 mt-1">{vehicle.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle History Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Histórico do Veículo</h2>
        
        {services.length > 0 ? (
          <div className="relative border-l-2 border-blue-200 ml-3">
            {services.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((service, index) => (
              <div key={service.id} className="mb-10 ml-6">
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 border border-white"></div>
                <div className="flex items-center mb-1">
                  <time className="text-sm font-normal leading-none text-gray-500">
                    {new Date(service.created_at).toLocaleDateString('pt-BR')}
                  </time>
                  <span className={`ml-3 text-xs font-medium mr-2 px-2.5 py-0.5 rounded 
                    ${service.type === 'quote' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'}`}>
                    {service.type === 'quote' ? 'Orçamento' : 'Ordem de Serviço'}
                  </span>
                  <span className={`ml-2 text-xs font-medium mr-2 px-2.5 py-0.5 rounded 
                    ${service.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      service.status === 'waiting_approval' ? 'bg-yellow-100 text-yellow-800' :
                      service.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      service.status === 'in_progress' ? 'bg-indigo-100 text-indigo-800' :
                      service.status === 'waiting_parts' ? 'bg-pink-100 text-pink-800' :
                      service.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      service.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                    {service.status === 'draft' ? 'Rascunho' :
                      service.status === 'waiting_approval' ? 'Aguardando Aprovação' :
                      service.status === 'approved' ? 'Aprovado' :
                      service.status === 'in_progress' ? 'Em Andamento' :
                      service.status === 'waiting_parts' ? 'Aguardando Peças' :
                      service.status === 'completed' ? 'Concluído' :
                      service.status === 'delivered' ? 'Entregue' :
                      'Cancelado'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.number}
                </h3>
                <p className="mt-2 text-base font-normal text-gray-600">
                  {service.items.length > 0 && 
                    service.items.slice(0, 2).map(item => 
                      <span key={item.id} className="block">{item.description}</span>
                    )
                  }
                  {service.items.length > 2 && 
                    <span className="block text-sm text-gray-500">... e {service.items.length - 2} outros itens</span>
                  }
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-gray-900 font-semibold">
                    Total: R${service.total.toFixed(2).replace('.', ',')}
                  </div>
                  <Link to={service.type === 'quote' ? `/quotes/${service.id}` : `/orders/${service.id}`} className="text-blue-600 hover:text-blue-900 font-medium">
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">Este veículo ainda não possui histórico de serviços.</p>
            <Link to={`/quotes/new?vehicle=${id}`} className="inline-block mt-3 text-blue-600 hover:text-blue-800">
              Criar novo orçamento
            </Link>
          </div>
        )}
      </div>

      {/* Interactive Service Map with Dots for when services happened */}
      {services.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Linha do Tempo de Serviços</h2>
          <div className="h-20 relative flex items-center">
            {/* Timeline bar */}
            <div className="w-full bg-gray-200 h-1 absolute"></div>
            
            {/* Get earliest and latest dates */}
            {(() => {
              const dates = services.map(s => new Date(s.created_at));
              const firstDate = new Date(Math.min(...dates));
              const lastDate = new Date(Math.max(...dates));
              const timespan = lastDate - firstDate;
              
              return services.map((service, index) => {
                const serviceDate = new Date(service.created_at);
                // Calculate position as percentage along the timeline
                const position = timespan === 0 ? 50 : ((serviceDate - firstDate) / timespan) * 100;
                
                return (
                  <div 
                    key={service.id} 
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full cursor-pointer border-2 border-white
                        ${service.type === 'quote' ? 'bg-purple-500' : 'bg-green-500'}`}
                      title={`${service.number} - ${new Date(service.created_at).toLocaleDateString('pt-BR')}`}
                    ></div>
                    <div className="text-xs text-center mt-1 whitespace-nowrap">
                      {new Date(service.created_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                );
              });
            })()}
            
            {/* Date labels */}
            <div className="absolute -bottom-8 left-0 text-xs text-gray-500">
              {services.length > 0 && new Date(Math.min(...services.map(s => new Date(s.created_at)))).toLocaleDateString('pt-BR')}
            </div>
            <div className="absolute -bottom-8 right-0 text-xs text-gray-500">
              {services.length > 0 && new Date(Math.max(...services.map(s => new Date(s.created_at)))).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch clients for reference
        const clientsResponse = await axios.get(`${API}/clients`);
        setClients(clientsResponse.data);
        
        // Build query for quotes
        const queryParams = new URLSearchParams();
        queryParams.append('service_type', 'quote');
        if (statusFilter) queryParams.append('status', statusFilter);
        
        // Fetch quotes with filters
        const quotesResponse = await axios.get(`${API}/services?${queryParams.toString()}`);
        
        // Sort quotes by date (newest first)
        const sortedQuotes = quotesResponse.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        
        setQuotes(sortedQuotes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [statusFilter]);

  // Filter quotes by search term (client name, number)
  const filteredQuotes = search
    ? quotes.filter(quote => {
        const client = clients.find(c => c.id === quote.client_id);
        const clientName = client ? client.name.toLowerCase() : '';
        return (
          quote.number.toLowerCase().includes(search.toLowerCase()) ||
          clientName.includes(search.toLowerCase())
        );
      })
    : quotes;

  // Format currency
  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  // Get client name from client ID
  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch(status) {
      case 'draft': return 'Rascunho';
      case 'waiting_approval': return 'Aguardando Aprovação';
      case 'approved': return 'Aprovado';
      case 'in_progress': return 'Em Progresso';
      case 'completed': return 'Concluído';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  // Get status style
  const getStatusStyle = (status) => {
    switch(status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'waiting_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'delivered': return 'bg-teal-100 text-teal-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orçamentos</h1>
        <Link 
          to="/quotes/new" 
          className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Orçamento
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
              placeholder="Buscar por número ou cliente..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="draft">Rascunho</option>
              <option value="waiting_approval">Aguardando Aprovação</option>
              <option value="approved">Aprovado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredQuotes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">Número</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Cliente</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{quote.number}</td>
                      <td className="px-6 py-4">{new Date(quote.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">{getClientName(quote.client_id)}</td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(quote.total)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(quote.status)}`}>
                          {getStatusLabel(quote.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/quotes/${quote.id}`} className="text-blue-600 hover:text-blue-900">
                            Ver
                          </Link>
                          {quote.status === 'draft' && (
                            <Link to={`/quotes/${quote.id}/edit`} className="text-green-600 hover:text-green-900">
                              Editar
                            </Link>
                          )}
                          {quote.status === 'approved' && (
                            <button 
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => {
                                if (window.confirm("Deseja converter este orçamento em uma ordem de serviço?")) {
                                  // Convert to work order logic would go here
                                  alert("Funcionalidade em implementação.");
                                }
                              }}
                            >
                              Converter p/ O.S.
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">
                Nenhum orçamento encontrado
                {search ? " para a busca realizada" : ""}
                {statusFilter ? ` com status "${getStatusLabel(statusFilter)}"` : ""}.
              </p>
              <Link to="/quotes/new" className="inline-block mt-3 text-blue-600 hover:text-blue-800">
                Criar novo orçamento
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const QuoteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  
  // Get the vehicle ID from the query string if it exists
  const searchParams = new URLSearchParams(location.search);
  const vehicleIdFromQuery = searchParams.get('vehicle');
  
  const [quote, setQuote] = useState({
    type: 'quote',
    client_id: '',
    vehicle_id: vehicleIdFromQuery || '',
    items: [],
    labor_cost: 0,
    parts_cost: 0,
    discount: 0,
    tax: 0,
    notes: '',
    status: 'draft'
  });
  
  const isEditing = !!id;

  // Fetch initial data (clients, parts)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch clients
        const clientsResponse = await axios.get(`${API}/clients`);
        setClients(clientsResponse.data);
        
        // Fetch parts for inventory selection
        const partsResponse = await axios.get(`${API}/parts`);
        setParts(partsResponse.data);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Erro ao carregar dados iniciais. Por favor, tente novamente.");
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  // Fetch vehicles when client is selected
  useEffect(() => {
    if (!quote.client_id) {
      setVehicles([]);
      if (!vehicleIdFromQuery) {
        setQuote(prev => ({ ...prev, vehicle_id: '' }));
      }
      return;
    }
    
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API}/vehicles?client_id=${quote.client_id}`);
        setVehicles(response.data);
        
        // If no vehicle is selected and we have vehicles, select the first one
        if (!quote.vehicle_id && response.data.length > 0 && !vehicleIdFromQuery) {
          setQuote(prev => ({ ...prev, vehicle_id: response.data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    
    fetchVehicles();
  }, [quote.client_id, vehicleIdFromQuery]);
  
  // Fetch quote data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchQuote = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${API}/services/${id}`);
          
          // Convert items to the format expected by our form
          const formattedItems = response.data.items.map(item => ({
            ...item,
            isService: item.type === 'service',
            part_id: item.type === 'part' ? item.part_id : null
          }));
          
          setQuote({
            ...response.data,
            items: formattedItems
          });
          
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching quote:", error);
          setError("Erro ao carregar dados do orçamento.");
          setIsLoading(false);
        }
      };
      
      fetchQuote();
    }
  }, [id, isEditing]);
  
  // Calculate the total
  const calculateTotal = () => {
    const laborCost = parseFloat(quote.labor_cost) || 0;
    const partsCost = parseFloat(quote.parts_cost) || 0;
    const discount = parseFloat(quote.discount) || 0;
    const tax = parseFloat(quote.tax) || 0;
    
    return laborCost + partsCost - discount + tax;
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (['labor_cost', 'parts_cost', 'discount', 'tax'].includes(name)) {
      const numericValue = value === '' ? 0 : parseFloat(value);
      
      setQuote(prev => {
        const updatedQuote = {
          ...prev,
          [name]: numericValue
        };
        
        // Update total
        if (name === 'labor_cost' || name === 'parts_cost') {
          // Calculate new parts_cost based on items
          const parts_cost = quote.items
            .filter(item => item.type === 'part')
            .reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
          
          if (name === 'labor_cost') {
            updatedQuote.parts_cost = parts_cost;
          }
        }
        
        return updatedQuote;
      });
    } else {
      setQuote(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Add a service item to the quote
  const addServiceItem = () => {
    const newItem = {
      id: Date.now().toString(), // Temporary id
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
      type: 'service'
    };
    
    setQuote(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };
  
  // Add a part item to the quote
  const addPartItem = (partId) => {
    const part = parts.find(p => p.id === partId);
    
    if (!part) return;
    
    const newItem = {
      id: Date.now().toString(), // Temporary id
      description: part.name,
      quantity: 1,
      unit_price: part.sale_price,
      total: part.sale_price,
      type: 'part',
      part_id: part.id
    };
    
    setQuote(prev => {
      const updatedItems = [...prev.items, newItem];
      
      // Calculate new parts_cost
      const parts_cost = updatedItems
        .filter(item => item.type === 'part')
        .reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
      
      return {
        ...prev,
        items: updatedItems,
        parts_cost: parts_cost
      };
    });
    
    // Remove from selected parts
    setSelectedParts(prev => prev.filter(id => id !== partId));
  };
  
  // Update an item in the quote
  const updateItem = (itemId, field, value) => {
    setQuote(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate total if quantity or unit_price changed
          if (field === 'quantity' || field === 'unit_price') {
            updatedItem.quantity = parseFloat(updatedItem.quantity) || 0;
            updatedItem.unit_price = parseFloat(updatedItem.unit_price) || 0;
            updatedItem.total = updatedItem.quantity * updatedItem.unit_price;
          }
          
          return updatedItem;
        }
        return item;
      });
      
      // Calculate new parts_cost if needed
      const parts_cost = updatedItems
        .filter(item => item.type === 'part')
        .reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
      
      return {
        ...prev,
        items: updatedItems,
        parts_cost: parts_cost
      };
    });
  };
  
  // Remove an item from the quote
  const removeItem = (itemId) => {
    setQuote(prev => {
      const updatedItems = prev.items.filter(item => item.id !== itemId);
      
      // Calculate new parts_cost
      const parts_cost = updatedItems
        .filter(item => item.type === 'part')
        .reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
      
      return {
        ...prev,
        items: updatedItems,
        parts_cost: parts_cost
      };
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!quote.client_id || !quote.vehicle_id) {
      setError("Cliente e veículo são obrigatórios.");
      return;
    }
    
    // Prepare data for submission
    const quoteData = {
      ...quote,
      total: calculateTotal()
    };
    
    try {
      setIsLoading(true);
      setError(null);
      
      if (isEditing) {
        await axios.put(`${API}/services/${id}`, quoteData);
      } else {
        await axios.post(`${API}/services`, quoteData);
      }
      
      navigate('/quotes');
    } catch (error) {
      console.error("Error saving quote:", error);
      setError("Erro ao salvar orçamento. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };
  
  // Format currency for display
  const formatCurrency = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "R$ 0,00";
    return `R$ ${numValue.toFixed(2).replace('.', ',')}`;
  };
  
  if (isLoading && isEditing) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? 'Editar Orçamento' : 'Novo Orçamento'}
        </h1>
        <button
          onClick={() => navigate('/quotes')}
          className="inline-flex items-center py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Selection */}
            <div>
              <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 mb-1">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                id="client_id"
                name="client_id"
                value={quote.client_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Selecione um cliente</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.document}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Vehicle Selection */}
            <div>
              <label htmlFor="vehicle_id" className="block text-sm font-medium text-gray-700 mb-1">
                Veículo <span className="text-red-500">*</span>
              </label>
              <select
                id="vehicle_id"
                name="vehicle_id"
                value={quote.vehicle_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                disabled={!quote.client_id || vehicles.length === 0}
              >
                <option value="">Selecione um veículo</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} - {vehicle.license_plate}
                  </option>
                ))}
              </select>
              {quote.client_id && vehicles.length === 0 && (
                <p className="mt-1 text-sm text-red-600">
                  Este cliente não possui veículos cadastrados.{' '}
                  <Link to={`/vehicles/new?client=${quote.client_id}`} className="text-blue-600 hover:text-blue-800">
                    Cadastrar veículo
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Itens do Orçamento</h2>
            <button
              type="button"
              onClick={addServiceItem}
              className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adicionar Serviço
            </button>
          </div>
          
          {/* Service/Parts Items Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Qtd</th>
                  <th className="px-4 py-2">Preço Unit.</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.length > 0 ? (
                  quote.items.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'service' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {item.type === 'service' ? 'Serviço' : 'Peça'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-1.5"
                          placeholder="Descrição do item"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-1.5"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => updateItem(item.id, 'unit_price', e.target.value)}
                          className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-1.5"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium">
                        {formatCurrency(item.quantity * item.unit_price)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                      Nenhum item adicionado. Clique em "Adicionar Serviço" ou selecione uma peça abaixo.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="border-t">
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-right font-medium">Total de Itens:</td>
                  <td className="px-4 py-2 font-bold">
                    {formatCurrency(quote.items.reduce((total, item) => total + (item.quantity * item.unit_price), 0))}
                  </td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* Parts Selection */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Adicionar Peças do Estoque</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {parts
                .filter(part => part.quantity > 0 && !quote.items.some(item => item.part_id === part.id))
                .slice(0, 10) // Limit to first 10 parts to avoid UI clutter
                .map(part => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => addPartItem(part.id)}
                    className="inline-flex items-center py-1 px-3 bg-green-50 border border-green-200 text-green-700 rounded hover:bg-green-100 transition-colors text-sm"
                  >
                    <span className="mr-1">+</span> {part.name} ({formatCurrency(part.sale_price)})
                  </button>
                ))}
              {parts.filter(part => part.quantity > 0 && !quote.items.some(item => item.part_id === part.id)).length > 10 && (
                <span className="text-sm text-gray-500 self-center">
                  + {parts.filter(part => part.quantity > 0 && !quote.items.some(item => item.part_id === part.id)).length - 10} mais...
                </span>
              )}
              {parts.filter(part => part.quantity > 0 && !quote.items.some(item => item.part_id === part.id)).length === 0 && (
                <span className="text-sm text-gray-500">
                  Não há peças disponíveis em estoque para adicionar.
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Valores e Totais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Labor Cost */}
            <div>
              <label htmlFor="labor_cost" className="block text-sm font-medium text-gray-700 mb-1">
                Mão de Obra (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="labor_cost"
                name="labor_cost"
                value={quote.labor_cost}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            
            {/* Parts Cost (read only, calculated from items) */}
            <div>
              <label htmlFor="parts_cost" className="block text-sm font-medium text-gray-700 mb-1">
                Valor de Peças (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="parts_cost"
                name="parts_cost"
                value={quote.parts_cost}
                readOnly
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
              <p className="mt-1 text-xs text-gray-500">
                Calculado automaticamente a partir dos itens de peças adicionados acima.
              </p>
            </div>
            
            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                Desconto (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="discount"
                name="discount"
                value={quote.discount}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            
            {/* Tax */}
            <div>
              <label htmlFor="tax" className="block text-sm font-medium text-gray-700 mb-1">
                Impostos/Taxas (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="tax"
                name="tax"
                value={quote.tax}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={quote.status}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="draft">Rascunho</option>
                <option value="waiting_approval">Aguardando Aprovação</option>
                <option value="approved">Aprovado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            
            {/* Grand Total (calculated) */}
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">Total Final:</span>
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Observações</h2>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Observações e Condições
            </label>
            <textarea
              id="notes"
              name="notes"
              value={quote.notes || ''}
              onChange={handleChange}
              rows="3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Adicione informações adicionais, condições ou observações sobre o orçamento..."
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/quotes')}
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              'Salvar Orçamento'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
const QuoteDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Orçamento</h1><p>Em construção...</p></div>;
const OrderList = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Ordens de Serviço</h1><p>Em construção...</p></div>;
const OrderForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Nova Ordem de Serviço</h1><p>Em construção...</p></div>;
const OrderDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes da Ordem de Serviço</h1><p>Em construção...</p></div>;
const InventoryList = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (lowStockOnly) queryParams.append('low_stock', 'true');
        
        const response = await axios.get(`${API}/parts?${queryParams.toString()}`);
        setParts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching parts:", error);
        setLoading(false);
      }
    };

    fetchParts();
  }, [search, lowStockOnly]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Estoque</h1>
        <Link 
          to="/inventory/new" 
          className="inline-flex items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Item
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
              placeholder="Buscar por código, nome, descrição..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="low-stock-checkbox"
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="low-stock-checkbox" className="ml-2 text-sm font-medium text-gray-900">
              Mostrar apenas itens com estoque baixo
            </label>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {parts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">Código</th>
                    <th className="px-6 py-3">Descrição</th>
                    <th className="px-6 py-3">Preço Venda (R$)</th>
                    <th className="px-6 py-3">Estoque</th>
                    <th className="px-6 py-3">Mínimo</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part) => (
                    <tr key={part.id} className={`border-b hover:bg-gray-50 ${part.quantity <= part.min_quantity ? 'bg-yellow-50' : ''}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{part.code}</td>
                      <td className="px-6 py-4">{part.name}</td>
                      <td className="px-6 py-4">{part.sale_price.toFixed(2).replace('.', ',')}</td>
                      <td className={`px-6 py-4 ${part.quantity <= part.min_quantity ? 'font-bold text-red-600' : ''}`}>
                        {part.quantity} {part.unit}
                      </td>
                      <td className="px-6 py-4">{part.min_quantity} {part.unit}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/inventory/${part.id}`} className="text-blue-600 hover:text-blue-900">
                            Ver
                          </Link>
                          <Link to={`/inventory/${part.id}/edit`} className="text-green-600 hover:text-green-900">
                            Editar
                          </Link>
                          <button 
                            className="text-purple-600 hover:text-purple-900"
                            onClick={() => {
                              const quantity = prompt(`Adicionar quantidade ao estoque para: ${part.name}`, "1");
                              if (quantity !== null) {
                                const parsedQuantity = parseInt(quantity);
                                if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
                                  const newQuantity = part.quantity + parsedQuantity;
                                  axios.put(`${API}/parts/${part.id}`, { quantity: newQuantity })
                                    .then(() => {
                                      setParts(parts.map(p => 
                                        p.id === part.id ? {...p, quantity: newQuantity} : p
                                      ));
                                      alert(`Estoque atualizado. Novo estoque: ${newQuantity} ${part.unit}`);
                                    })
                                    .catch(err => {
                                      console.error("Error updating stock:", err);
                                      alert("Erro ao atualizar estoque!");
                                    });
                                } else {
                                  alert("Por favor, insira um número válido maior que zero.");
                                }
                              }
                            }}
                          >
                            + Estoque
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <p className="text-gray-500">Nenhum item encontrado{search ? " para a busca realizada" : lowStockOnly ? " com estoque baixo" : ""}.</p>
              <Link to="/inventory/new" className="inline-block mt-3 text-blue-600 hover:text-blue-800">
                Adicionar novo item ao estoque
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const InventoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [part, setPart] = useState({
    code: '',
    name: '',
    description: '',
    supplier: '',
    cost_price: '',
    sale_price: '',
    quantity: '',
    min_quantity: '',
    unit: 'unit',
    location: ''
  });
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchPart = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${API}/parts/${id}`);
          setPart(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching part:", error);
          setError("Erro ao carregar dados da peça.");
          setIsLoading(false);
        }
      };
      fetchPart();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart(prev => ({
      ...prev,
      [name]: name === 'cost_price' || name === 'sale_price' || name === 'quantity' || name === 'min_quantity' 
        ? value === '' ? '' : Number(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!part.code || !part.name || !part.cost_price || !part.sale_price || part.quantity === '') {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      if (isEditing) {
        // Update existing part
        const { id: _, ...updateData } = part;
        await axios.put(`${API}/parts/${id}`, updateData);
      } else {
        // Create new part
        await axios.post(`${API}/parts`, part);
      }
      
      navigate('/inventory');
    } catch (error) {
      console.error("Error saving part:", error);
      setError(error.response?.data?.detail || "Erro ao salvar peça.");
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditing ? 'Editar Item' : 'Novo Item de Estoque'}
        </h1>
        <button
          onClick={() => navigate('/inventory')}
          className="inline-flex items-center py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Código */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={part.code}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ex: OIL-5W30"
                required
              />
            </div>

            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={part.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ex: Óleo Motor 5W30 Sintético"
                required
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={part.description || ''}
                onChange={handleChange}
                rows="2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descrição detalhada do item..."
              ></textarea>
            </div>

            {/* Fornecedor */}
            <div>
              <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
                Fornecedor
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={part.supplier || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ex: Shell"
              />
            </div>

            {/* Localização */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localização no Estoque
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={part.location || ''}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ex: Prateleira A, Seção 3"
              />
            </div>

            {/* Preço de Custo */}
            <div>
              <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700 mb-1">
                Preço de Custo (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="cost_price"
                name="cost_price"
                value={part.cost_price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0,00"
                required
              />
            </div>

            {/* Preço de Venda */}
            <div>
              <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-1">
                Preço de Venda (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="sale_price"
                name="sale_price"
                value={part.sale_price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0,00"
                required
              />
            </div>

            {/* Quantidade Atual */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade em Estoque <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                id="quantity"
                name="quantity"
                value={part.quantity}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0"
                required
              />
            </div>

            {/* Quantidade Mínima */}
            <div>
              <label htmlFor="min_quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Mínima
              </label>
              <input
                type="number"
                step="1"
                min="0"
                id="min_quantity"
                name="min_quantity"
                value={part.min_quantity || 0}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0"
              />
            </div>

            {/* Unidade */}
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                Unidade de Medida
              </label>
              <select
                id="unit"
                name="unit"
                value={part.unit}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="unit">Unidade (un)</option>
                <option value="litro">Litro (L)</option>
                <option value="metro">Metro (m)</option>
                <option value="kg">Quilograma (kg)</option>
                <option value="par">Par</option>
                <option value="conjunto">Conjunto</option>
                <option value="pacote">Pacote</option>
                <option value="caixa">Caixa</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/inventory')}
              className="mr-2 py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                'Salvar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const InventoryDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Item</h1><p>Em construção...</p></div>;
const ScheduleView = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Agenda</h1><p>Em construção...</p></div>;
const ScheduleForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Agendamento</h1><p>Em construção...</p></div>;
const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    fetchBackupStatus();
  }, []);

  const fetchBackupStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/backup/status`);
      setBackupStatus(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching backup status:", error);
      setMessage({
        type: "error",
        text: "Erro ao carregar status do backup"
      });
      setLoading(false);
    }
  };

  const handleBackup = async () => {
    try {
      setLoading(true);
      setMessage(null);
      
      // Using axios with responseType blob to handle file download
      const response = await axios.post(
        `${API}/backup`,
        {},
        { responseType: 'blob' } 
      );
      
      // Create file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      
      // Get filename from content-disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'europa_backup.zip';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setMessage({
        type: "success",
        text: "Backup criado com sucesso e o download foi iniciado"
      });
      
      // Refresh backup status
      fetchBackupStatus();
      
    } catch (error) {
      console.error("Error creating backup:", error);
      setMessage({
        type: "error",
        text: "Erro ao criar backup"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleRestore = async () => {
    if (!uploadFile) {
      setMessage({
        type: "error",
        text: "Por favor, selecione um arquivo de backup para restaurar"
      });
      return;
    }
    
    // Ask for confirmation
    if (!window.confirm("ATENÇÃO: Restaurar um backup substituirá TODOS os dados atuais do sistema. Esta ação não pode ser desfeita. Deseja continuar?")) {
      return;
    }
    
    try {
      setLoading(true);
      setMessage(null);
      
      const formData = new FormData();
      formData.append('backup_file', uploadFile);
      
      const response = await axios.post(`${API}/restore`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage({
        type: "success",
        text: `Backup restaurado com sucesso! ${response.data.collections_restored} coleções foram restauradas.`
      });
      
      // Reset file input
      setUploadFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh backup status
      fetchBackupStatus();
      
    } catch (error) {
      console.error("Error restoring backup:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Erro ao restaurar backup"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Backup e Restauração</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Backup Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fazer Backup</h2>
          <p className="text-gray-600 mb-4">
            Crie um backup completo de todos os dados do sistema. O arquivo gerado pode ser utilizado para restaurar o sistema em caso de problemas.
          </p>
          
          {backupStatus && (
            <div className="mb-4 p-4 bg-blue-50 rounded">
              <h3 className="font-semibold text-blue-800 mb-2">Status Atual</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Clientes:</div>
                <div>{backupStatus.collections?.clients || 0}</div>
                
                <div>Veículos:</div>
                <div>{backupStatus.collections?.vehicles || 0}</div>
                
                <div>Peças:</div>
                <div>{backupStatus.collections?.parts || 0}</div>
                
                <div>Serviços:</div>
                <div>{backupStatus.collections?.quotes_orders || 0}</div>
                
                <div>Agendamentos:</div>
                <div>{backupStatus.collections?.appointments || 0}</div>
                
                <div className="font-semibold">Total de Documentos:</div>
                <div className="font-semibold">{backupStatus.total_documents || 0}</div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleBackup}
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Fazer Backup Agora
              </>
            )}
          </button>
        </div>
        
        {/* Restore Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Restaurar Backup</h2>
          <p className="text-gray-600 mb-4">
            Restaure um backup previamente criado. <span className="font-semibold text-red-600">Atenção:</span> Esta ação substituirá todos os dados atuais do sistema.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arquivo de Backup
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".zip"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Selecione um arquivo .zip de backup criado por este sistema
            </p>
          </div>
          
          <button
            onClick={handleRestore}
            disabled={loading || !uploadFile}
            className="w-full flex justify-center items-center py-2 px-4 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors disabled:bg-amber-300"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Restaurar Backup
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Boas Práticas de Backup</h2>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-800">Fazer backups regularmente</h3>
              <p className="mt-1 text-gray-600">Recomendamos fazer backups pelo menos uma vez por semana, ou após inserir uma quantidade significativa de dados.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-800">Manter cópias em locais diferentes</h3>
              <p className="mt-1 text-gray-600">Armazene os arquivos de backup em múltiplos dispositivos e locais (pen drive, HD externo, outra pasta no computador).</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-800">Fazer backup antes de grandes operações</h3>
              <p className="mt-1 text-gray-600">Sempre crie um backup antes de realizar operações em massa ou atualizações importantes no sistema.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-800">Tenha cuidado ao restaurar</h3>
              <p className="mt-1 text-gray-600">A restauração substituirá todos os dados atuais. Certifique-se de estar usando o arquivo de backup correto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main layout
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/clients/:id/edit" element={<ClientForm />} />
          
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/new" element={<VehicleForm />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/vehicles/:id/edit" element={<VehicleForm />} />
          
          <Route path="/quotes" element={<QuoteList />} />
          <Route path="/quotes/new" element={<QuoteForm />} />
          <Route path="/quotes/:id" element={<QuoteDetail />} />
          <Route path="/quotes/:id/edit" element={<QuoteForm />} />
          
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/new" element={<OrderForm />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/:id/edit" element={<OrderForm />} />
          
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
          <Route path="/inventory/:id" element={<InventoryDetail />} />
          <Route path="/inventory/:id/edit" element={<InventoryForm />} />
          
          <Route path="/schedule" element={<ScheduleView />} />
          <Route path="/schedule/new" element={<ScheduleForm />} />
          
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
