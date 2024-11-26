import { useState } from "react";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [contenido, setContenido] = useState("inicio");
  const [autenticado, setAutenticado] = useState(false);

  // Estados adicionales
  const [factura, setFactura] = useState({
    numero: "",
    cliente: "",
    fecha: "",
    total: "",
  });

  const [pago, setPago] = useState({
    cliente: "",
    monto: "",
    metodo: "tarjeta",
  });
  // Estados para el formulario de registro de cliente
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    numeroCliente: "",
    tipoCliente: "persona-natural",
    nit: "",
  });

  // Estado para recuperación de contraseña
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  function ingresar() {
    if (usuario === "admin" && clave === "admin") {
      alert("¡Bienvenido, admin!");
      setAutenticado(true);
      setContenido("inicio");
    } else {
      alert("Usuario o clave incorrectos");
    }
  }

  function cambiarContenido(nuevoContenido) {
    setContenido(nuevoContenido);
  }

  function cerrarSesion() {
    setAutenticado(false);
    setUsuario("");
    setClave("");
    alert("Has cerrado sesión");
  }

  // Manejo del formulario de generar factura
  function handleFacturaChange(event) {
    const { name, value } = event.target;
    setFactura({ ...factura, [name]: value });
  }

  function handleFacturaSubmit(event) {
    event.preventDefault();
    console.log("Datos de la factura:", factura);
    alert("Factura generada exitosamente");
  }

  // Manejo del formulario de gestión de pagos
  function handlePagoChange(event) {
    const { name, value } = event.target;
    setPago({ ...pago, [name]: value });
  }

  function handlePagoSubmit(event) {
    event.preventDefault();
    console.log("Datos del pago:", pago);
    alert("Pago registrado exitosamente");
  }

  // Manejo del formulario de registro de cliente
  function handleClienteChange(event) {
    const { name, value } = event.target;
    setCliente({ ...cliente, [name]: value });
  }

  function handleClienteSubmit(event) {
    event.preventDefault();
    console.log("Datos del cliente:", cliente);
    alert("Cliente registrado exitosamente");
  }

  // Manejo del formulario de recuperación de contraseña
  function handleRecuperacionSubmit(event) {
    event.preventDefault();
    console.log("Correo de recuperación:", correoRecuperacion);
    alert("Instrucciones enviadas al correo");
  }

  return (
    <div>
      <Header autenticado={autenticado} cerrarSesion={cerrarSesion} />
      <main>
        {autenticado ? (
          <>
            <Navigation cambiarContenido={cambiarContenido} />
            {contenido === "inicio" && (
              <section>
                <h2>Bienvenido</h2>
                <p>Selecciona una pestaña para ver su contenido.</p>
              </section>
            )}
            {contenido === "generar-factura" && (
              <GenerateInvoice
                factura={factura}
                handleFacturaChange={handleFacturaChange}
                handleFacturaSubmit={handleFacturaSubmit}
              />
            )}
            {contenido === "gestion-pagos" && (
              <ManagePayments
                pago={pago}
                handlePagoChange={handlePagoChange}
                handlePagoSubmit={handlePagoSubmit}
              />
            )}
            {contenido === "registro-cliente" && (
              <ClientRegistration
                cliente={cliente}
                handleClienteChange={handleClienteChange}
                handleClienteSubmit={handleClienteSubmit}
              />
            )}
            {contenido === "recuperacion-contrasena" && (
              <PasswordRecovery
                correoRecuperacion={correoRecuperacion}
                setCorreoRecuperacion={setCorreoRecuperacion}
                handleRecuperacionSubmit={handleRecuperacionSubmit}
              />
            )}
          </>
        ) : (
          <Login
            usuario={usuario}
            clave={clave}
            cambiarUsuario={cambiarUsuario}
            cambiarClave={cambiarClave}
            ingresar={ingresar}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

function Header({ autenticado, cerrarSesion }) {
  return (
    <header>
      <h1>BillinIQ</h1>
      {autenticado && (
        <button onClick={cerrarSesion} style={{ marginLeft: "auto" }}>
          Cerrar Sesión
        </button>
      )}
    </header>
  );
}

function Navigation({ cambiarContenido }) {
  return (
    <nav>
      <button onClick={() => cambiarContenido("inicio")}>Inicio</button>
      <button onClick={() => cambiarContenido("generar-factura")}>Generar Factura</button>
      <button onClick={() => cambiarContenido("gestion-pagos")}>Gestión de Pagos</button>
      <button onClick={() => cambiarContenido("registro-cliente")}>Registro Cliente</button>
      <button onClick={() => cambiarContenido("recuperacion-contrasena")}>
        Recuperación Contraseña
      </button>
    </nav>
  );
}

function Login({ usuario, clave, cambiarUsuario, cambiarClave, ingresar }) {
  return (
    <section>
      <h2>Login</h2>
      <input
        type="text"
        value={usuario}
        onChange={cambiarUsuario}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={clave}
        onChange={cambiarClave}
        placeholder="Contraseña"
      />
      <button onClick={ingresar}>Ingresar</button>
    </section>
  );
}

function GenerateInvoice({ factura, handleFacturaChange, handleFacturaSubmit }) {
  return (
    <section>
      <h2>Generar Factura</h2>
      <form onSubmit={handleFacturaSubmit}>
        <div>
          <label htmlFor="numeroFactura">Número de Factura:</label>
          <input
            type="text"
            id="numeroFactura"
            name="numero"
            value={factura.numero}
            onChange={handleFacturaChange}
            required
          />
        </div>
        <div>
          <label htmlFor="clienteFactura">Cliente:</label>
          <input
            type="text"
            id="clienteFactura"
            name="cliente"
            value={factura.cliente}
            onChange={handleFacturaChange}
            required
          />
        </div>
        <div>
          <label htmlFor="fechaFactura">Fecha:</label>
          <input
            type="date"
            id="fechaFactura"
            name="fecha"
            value={factura.fecha}
            onChange={handleFacturaChange}
            required
          />
        </div>
        <div>
          <label htmlFor="totalFactura">Total:</label>
          <input
            type="number"
            id="totalFactura"
            name="total"
            value={factura.total}
            onChange={handleFacturaChange}
            required
          />
        </div>
        <button type="submit">Generar Factura</button>
      </form>
    </section>
  );
}

function ClientRegistration({ cliente, handleClienteChange, handleClienteSubmit }) {
  return (
    <section>
      <h2>Registro Cliente</h2>
      <form onSubmit={handleClienteSubmit}>
        <div>
          <label htmlFor="nombreRegistro">Nombre:</label>
          <input
            type="text"
            id="nombreRegistro"
            name="nombre"
            value={cliente.nombre}
            onChange={handleClienteChange}
            required
          />
        </div>
        <div>
          <label htmlFor="direccionRegistro">Dirección:</label>
          <input
            type="text"
            id="direccionRegistro"
            name="direccion"
            value={cliente.direccion}
            onChange={handleClienteChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefonoRegistro">Teléfono:</label>
          <input
            type="tel"
            id="telefonoRegistro"
            name="telefono"
            value={cliente.telefono}
            onChange={handleClienteChange}
            required
          />
        </div>
        <div>
          <label htmlFor="correoRegistro">Correo Electrónico:</label>
          <input
            type="email"
            id="correoRegistro"
            name="correo"
            value={cliente.correo}
            onChange={handleClienteChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numeroClienteRegistro">Número de Cliente:</label>
          <input
            type="text"
            id="numeroClienteRegistro"
            name="numeroCliente"
            value={cliente.numeroCliente}
            onChange={handleClienteChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tipoClienteRegistro">Tipo de Cliente:</label>
          <select
            id="tipoClienteRegistro"
            name="tipoCliente"
            value={cliente.tipoCliente}
            onChange={handleClienteChange}
          >
            <option value="persona-natural">Persona Natural</option>
            <option value="persona-juridica">Persona Jurídica</option>
          </select>
        </div>
        {cliente.tipoCliente === "persona-juridica" && (
          <div>
            <label htmlFor="nitRegistro">NIT de la Empresa:</label>
            <input
              type="text"
              id="nitRegistro"
              name="nit"
              value={cliente.nit}
              onChange={handleClienteChange}
            />
          </div>
        )}
        <button type="submit">Registrar Cliente</button>
      </form>
    </section>
  );
}

function PasswordRecovery({
  correoRecuperacion,
  setCorreoRecuperacion,
  handleRecuperacionSubmit,
}) {
  return (
    <section>
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleRecuperacionSubmit}>
        <div>
          <label htmlFor="emailRecuperacion">Correo Electrónico:</label>
          <input
            type="email"
            id="emailRecuperacion"
            value={correoRecuperacion}
            onChange={(e) => setCorreoRecuperacion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Instrucciones</button>
      </form>
    </section>
  );
}

function ManagePayments({ pago, handlePagoChange, handlePagoSubmit }) {
  return (
    <section>
      <h2>Gestión de Pagos</h2>
      <form onSubmit={handlePagoSubmit}>
        <div>
          <label htmlFor="clientePago">Cliente:</label>
          <input
            type="text"
            id="clientePago"
            name="cliente"
            value={pago.cliente}
            onChange={handlePagoChange}
            required
          />
        </div>
        <div>
          <label htmlFor="montoPago">Monto:</label>
          <input
            type="number"
            id="montoPago"
            name="monto"
            value={pago.monto}
            onChange={handlePagoChange}
            required
          />
        </div>
        <div>
          <label htmlFor="metodoPago">Método de Pago:</label>
          <select
            id="metodoPago"
            name="metodo"
            value={pago.metodo}
            onChange={handlePagoChange}
          >
            <option value="tarjeta">Tarjeta</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>
        <button type="submit">Registrar Pago</button>
      </form>
    </section>
  );
}


function Footer() {
  return (
    <footer>
      <p>&copy; 2024 BillinIQ. Todos los derechos reservados.</p>
    </footer>
  );
}

export default App;
