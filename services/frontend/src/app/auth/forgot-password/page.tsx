export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold text-center">Recuperar contraseña</h1>
        <p className="text-center text-sm text-muted-foreground">
          Ingresa tu correo electrónico para recibir instrucciones de
          recuperación.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar instrucciones
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          ¿Recuerdas tu contraseña?{" "}
          <a
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Iniciar sesión
          </a>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <a
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Registrarse
          </a>
        </p>
      </div>
    </div>
  );
}
