
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Task Tracker</h1>
        <p className="text-muted-foreground">Track your projects and tasks with ease</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
