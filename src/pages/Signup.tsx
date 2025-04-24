
import SignupForm from '@/components/auth/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Task Tracker</h1>
        <p className="text-muted-foreground">Create an account to get started</p>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
