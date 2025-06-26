import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  GraduationCap,
  TrendingUp,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  MapPin,
  Mail,
  Award,
  Target,
  Activity,
  PieChart,
  UserCheck,
  BookOpen,
  Bell,
  Menu,
  X
} from 'lucide-react';
import './AdminDashboard.css';

// Sample data
const sampleStudents = [
  { id: 1, name: "Ana Torres", email: "ana.torres@email.com", testDate: "2025-06-20", personality: "Líder Creativo", topCareer: "Ingeniería Industrial", score: 92, city: "Caracas", avatar: "AT" },
  { id: 2, name: "Carlos Pérez", email: "carlos.perez@email.com", testDate: "2025-06-21", personality: "Analítico", topCareer: "Economía", score: 88, city: "Maracaibo", avatar: "CP" },
  { id: 3, name: "María Gómez", email: "maria.gomez@email.com", testDate: "2025-06-22", personality: "Comunicador", topCareer: "Comunicación Social", score: 85, city: "Valencia", avatar: "MG" },
  { id: 4, name: "Luis Rodríguez", email: "luis.rod@email.com", testDate: "2025-06-23", personality: "Innovador", topCareer: "Ingeniería Informática", score: 95, city: "Caracas", avatar: "LR" },
  { id: 5, name: "Sofía Martínez", email: "sofia.mtz@email.com", testDate: "2025-06-24", personality: "Líder Creativo", topCareer: "Derecho", score: 90, city: "Barquisimeto", avatar: "SM" },
  { id: 6, name: "Pedro Jiménez", email: "pedro.jim@email.com", testDate: "2025-06-25", personality: "Analítico", topCareer: "Contaduría", score: 87, city: "Caracas", avatar: "PJ" },
  { id: 7, name: "Valentina Ruiz", email: "valen.ruiz@email.com", testDate: "2025-06-25", personality: "Comunicador", topCareer: "Psicología", score: 89, city: "Puerto Ordaz", avatar: "VR" },
  { id: 8, name: "Miguel Blanco", email: "miguel.blanco@email.com", testDate: "2025-06-25", personality: "Innovador", topCareer: "Ingeniería Civil", score: 91, city: "Caracas", avatar: "MB" },
];

const stats = {
  totalStudents: 320,
  testsTaken: 310,
  avgScore: 89.2,
  completionRate: 96.9,
};

const personalityData = [
  { name: "Líder Creativo", count: 3, color: "bg-blue-500", percentage: 37.5 },
  { name: "Analítico", count: 2, color: "bg-purple-500", percentage: 25 },
  { name: "Comunicador", count: 2, color: "bg-green-500", percentage: 25 },
  { name: "Innovador", count: 1, color: "bg-orange-500", percentage: 12.5 },
];

const careerData = [
  { name: "Ingeniería Informática", count: 2, percentage: 25 },
  { name: "Ingeniería Industrial", count: 1, percentage: 12.5 },
  { name: "Economía", count: 1, percentage: 12.5 },
  { name: "Comunicación Social", count: 1, percentage: 12.5 },
  { name: "Derecho", count: 1, percentage: 12.5 },
  { name: "Otros", count: 2, percentage: 25 },
];

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recentStudents = sampleStudents.slice(-4).reverse();

  const StatCard = ({ title, value, change, icon: Icon, trend = "up" }) => (
    <div className="dashboard-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3>{title}</h3>
          <p>{value}</p>
          {change && (
            <div style={{ color: trend === 'up' ? '#22c55e' : '#ef4444', fontSize: '0.95rem', marginTop: 8, display: 'flex', alignItems: 'center' }}>
              <TrendingUp style={{ width: 16, height: 16, marginRight: 4 }} />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div style={{ padding: 12, background: '#f0f2f5', borderRadius: 12 }}>
          <Icon style={{ width: 28, height: 28, color: '#3b82f6' }} />
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, className = "" }) => (
    <div className={`chart-card ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );

  const ProgressBar = ({ percentage, color = "#3b82f6" }) => (
    <div style={{ width: '100%', background: '#e5e7eb', borderRadius: 8, height: 8 }}>
      <div style={{ background: color, height: 8, borderRadius: 8, width: `${percentage}%`, transition: 'width 0.3s' }}></div>
    </div>
  );

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <GraduationCap style={{ width: 36, height: 36, color: '#3b82f6' }} />
          <h2>OrientaUCAB</h2>
        </div>
        <nav className="sidebar-nav">
          {[
            {
              id: "dashboard",
              label: "Dashboard",
              icon: BarChart3
            },
            {
              id: "students",
              label: "Estudiantes",
              icon: Users
            },
            {
              id: "stats",
              label: "Estadísticas",
              icon: PieChart
            },
            {
              id: "settings",
              label: "Configuración",
              icon: Settings
            }
          ].map((item) => (
            <button
              key={item.id}
              className={selectedTab === item.id ? "active" : ""}
              onClick={() => setSelectedTab(item.id)}
            >
              <item.icon style={{ width: 20, height: 20, marginRight: 12, verticalAlign: 'middle' }} />
              {item.label}
            </button>
          ))}
        </nav>
        <button className="logout-btn" style={{ marginTop: 'auto' }}>
          <LogOut style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }} />
          Cerrar sesión
        </button>
      </aside>
      {/* Main content */}
      <main className="admin-main-content">
        {selectedTab === "dashboard" && (
          <section className="dashboard-overview">
            <h1>Dashboard</h1>
            <div className="dashboard-cards">
              <StatCard
                title="Total Estudiantes"
                value={stats.totalStudents.toLocaleString()}
                change="+12% vs mes anterior"
                icon={Users}
              />
              <StatCard
                title="Tests Realizados"
                value={stats.testsTaken.toLocaleString()}
                change="+8% vs mes anterior"
                icon={UserCheck}
              />
              <StatCard
                title="Puntuación Promedio"
                value={stats.avgScore}
                change="+2.1 puntos"
                icon={Award}
              />
              <StatCard
                title="Tasa de Finalización"
                value={`${stats.completionRate}%`}
                change="+1.2%"
                icon={Target}
              />
            </div>
            <div className="stats-charts">
              <ChartCard title="Distribución de Arquetipos">
                <div>
                  {personalityData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.name === 'Líder Creativo' ? '#3b82f6' : item.name === 'Analítico' ? '#8b5cf6' : item.name === 'Comunicador' ? '#22c55e' : '#f59e42' }}></div>
                        <span>{item.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 80 }}>
                          <ProgressBar percentage={item.percentage} color={item.name === 'Líder Creativo' ? '#3b82f6' : item.name === 'Analítico' ? '#8b5cf6' : item.name === 'Comunicador' ? '#22c55e' : '#f59e42'} />
                        </div>
                        <span>{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
              <ChartCard title="Actividad Reciente">
                <div>
                  {recentStudents.map((student) => (
                    <div key={student.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 32, height: 32, background: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 13, color: '#7a7f87' }}>{student.avatar}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600 }}>{student.name}</div>
                        <div style={{ fontSize: 12, color: '#7a7f87' }}>{student.topCareer}</div>
                      </div>
                      <div style={{ fontSize: 12, color: '#b0b3b8' }}>
                        {new Date(student.testDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
            <ChartCard title="Carreras Más Populares">
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {careerData.map((career, index) => (
                  <div key={index} style={{ background: '#f7f8fa', borderRadius: 10, padding: 16, minWidth: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{career.name}</span>
                      <span>{career.count}</span>
                    </div>
                    <ProgressBar percentage={career.percentage} />
                    <span style={{ fontSize: 11, color: '#7a7f87', marginTop: 4, display: 'block' }}>{career.percentage}%</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </section>
        )}

        {selectedTab === "students" && (
          <section className="students-section">
            <h1>Estudiantes</h1>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <input type="text" placeholder="Buscar estudiantes..." style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <button style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}><Filter style={{ width: 16, height: 16, marginRight: 6, verticalAlign: 'middle' }} />Filtros</button>
              <button style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}><Download style={{ width: 16, height: 16, marginRight: 6, verticalAlign: 'middle' }} />Exportar</button>
              <button style={{ padding: '10px 18px', borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none' }}><Plus style={{ width: 16, height: 16, marginRight: 6, verticalAlign: 'middle' }} />Agregar</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Contacto</th>
                    <th>Ubicación</th>
                    <th>Test</th>
                    <th>Arquetipo</th>
                    <th>Carrera</th>
                    <th>Puntuación</th>
                    <th style={{ textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ width: 36, height: 36, background: '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#3b82f6', fontWeight: 600 }}>{student.avatar}</span>
                          </div>
                          <div style={{ marginLeft: 12 }}>
                            <div style={{ fontWeight: 600 }}>{student.name}</div>
                            <div style={{ fontSize: 12, color: '#7a7f87' }}>ID: {student.id}</div>
                          </div>
                        </div>
                      </td>
                      <td><span style={{ display: 'flex', alignItems: 'center', color: '#7a7f87', fontSize: 13 }}><Mail style={{ width: 14, height: 14, marginRight: 6 }} />{student.email}</span></td>
                      <td><span style={{ display: 'flex', alignItems: 'center', color: '#7a7f87', fontSize: 13 }}><MapPin style={{ width: 14, height: 14, marginRight: 6 }} />{student.city}</span></td>
                      <td><span style={{ display: 'flex', alignItems: 'center', color: '#7a7f87', fontSize: 13 }}><Calendar style={{ width: 14, height: 14, marginRight: 6 }} />{new Date(student.testDate).toLocaleDateString()}</span></td>
                      <td><span style={{ background: '#e0e7ff', color: '#3b82f6', borderRadius: 8, padding: '2px 10px', fontSize: 12 }}>{student.personality}</span></td>
                      <td>{student.topCareer}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600 }}>{student.score}</span>
                          <div style={{ marginLeft: 8, width: 48, background: '#e5e7eb', borderRadius: 8, height: 8 }}>
                            <div style={{ background: '#22c55e', height: 8, borderRadius: 8, width: `${student.score}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button style={{ color: '#3b82f6', marginRight: 6 }}><Eye style={{ width: 14, height: 14 }} /></button>
                        <button style={{ color: '#7a7f87', marginRight: 6 }}><Edit style={{ width: 14, height: 14 }} /></button>
                        <button style={{ color: '#ef4444', marginRight: 6 }}><Trash2 style={{ width: 14, height: 14 }} /></button>
                        <button style={{ color: '#7a7f87' }}><MoreHorizontal style={{ width: 14, height: 14 }} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {selectedTab === "stats" && (
          <section className="stats-section">
            <h1>Estadísticas</h1>
            <div className="dashboard-cards">
              <StatCard
                title="Estudiantes Activos"
                value="320"
                change="+15% este mes"
                icon={Activity}
              />
              <StatCard
                title="Tests Completados"
                value="310"
                change="+8% este mes"
                icon={BookOpen}
              />
              <StatCard
                title="Puntuación Media"
                value="89.2"
                change="+2.1 puntos"
                icon={Award}
              />
            </div>
            <div className="stats-charts">
              <ChartCard title="Tendencia de Registros">
                <div className="chart-placeholder">
                  <BarChart3 style={{ width: 48, height: 48, color: '#b0b3b8', marginBottom: 8 }} />
                  Gráfico de tendencias
                </div>
              </ChartCard>
              <ChartCard title="Distribución por Ciudad">
                <div>
                  {[
                    {
                      city: "Caracas",
                      count: 45,
                      percentage: 40
                    },
                    {
                      city: "Maracaibo",
                      count: 32,
                      percentage: 28
                    },
                    {
                      city: "Valencia",
                      count: 28,
                      percentage: 25
                    },
                    {
                      city: "Barquisimeto",
                      count: 15,
                      percentage: 13
                    }
                  ].map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span>{item.city}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 80 }}>
                          <ProgressBar percentage={item.percentage} />
                        </div>
                        <span>{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
            <ChartCard title="Métricas de Rendimiento">
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#3b82f6' }}>96.9%</div>
                  <div style={{ color: '#7a7f87', fontSize: 14 }}>Tasa de Finalización</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#22c55e' }}>4.8</div>
                  <div style={{ color: '#7a7f87', fontSize: 14 }}>Satisfacción Promedio</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#8b5cf6' }}>12min</div>
                  <div style={{ color: '#7a7f87', fontSize: 14 }}>Tiempo Promedio</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#f59e42' }}>89%</div>
                  <div style={{ color: '#7a7f87', fontSize: 14 }}>Precisión</div>
                </div>
              </div>
            </ChartCard>
          </section>
        )}

        {selectedTab === "settings" && (
          <section className="settings-section">
            <h1>Configuración</h1>
            <ChartCard title="Configuración General">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 6 }}>Nombre de la Plataforma</label>
                  <input type="text" defaultValue="OrientaUCAB" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6 }}>Email de Contacto</label>
                  <input type="email" defaultValue="admin@orientaucab.edu.ve" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>Notificaciones por Email</h4>
                    <p style={{ color: '#7a7f87', fontSize: 13 }}>Recibir notificaciones de nuevos registros</p>
                  </div>
                  <button style={{ width: 44, height: 24, background: '#3b82f6', borderRadius: 12, border: 'none', position: 'relative' }}>
                    <span style={{ display: 'inline-block', width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', left: 22, top: 3, transition: 'left 0.2s' }} />
                  </button>
                </div>
                <button className="logout-btn">
                  <LogOut style={{ width: 16, height: 16, marginRight: 6, verticalAlign: 'middle' }} />Cerrar Sesión
                </button>
              </div>
            </ChartCard>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;