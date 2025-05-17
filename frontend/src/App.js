import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
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
        <h1 className="text-2xl font-bold">Auto Master</h1>
        <p className="text-sm text-gray-400">Gestão de Oficina</p>
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
const ClientForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Cliente</h1><p>Em construção...</p></div>;
const ClientDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Cliente</h1><p>Em construção...</p></div>;
const VehicleList = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Veículos</h1><p>Em construção...</p></div>;
const VehicleForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Veículo</h1><p>Em construção...</p></div>;
const VehicleDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Veículo</h1><p>Em construção...</p></div>;
const QuoteList = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Orçamentos</h1><p>Em construção...</p></div>;
const QuoteForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Orçamento</h1><p>Em construção...</p></div>;
const QuoteDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Orçamento</h1><p>Em construção...</p></div>;
const OrderList = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Ordens de Serviço</h1><p>Em construção...</p></div>;
const OrderForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Nova Ordem de Serviço</h1><p>Em construção...</p></div>;
const OrderDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes da Ordem de Serviço</h1><p>Em construção...</p></div>;
const InventoryList = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Estoque</h1><p>Em construção...</p></div>;
const InventoryForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Item de Estoque</h1><p>Em construção...</p></div>;
const InventoryDetail = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Detalhes do Item</h1><p>Em construção...</p></div>;
const ScheduleView = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Agenda</h1><p>Em construção...</p></div>;
const ScheduleForm = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Novo Agendamento</h1><p>Em construção...</p></div>;
const Reports = () => <div className="p-6"><h1 className="text-3xl font-bold text-gray-800 mb-6">Relatórios</h1><p>Em construção...</p></div>;

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
