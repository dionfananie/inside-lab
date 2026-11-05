import { LogIn, LogOut, UserRound } from 'lucide-react';
import { Link } from 'react-router';
import { logout, useAuth } from '~/lib/auth';

export default function AuthControl() {
  const { loading, user } = useAuth();
  if (loading) return <span className="auth-control-placeholder" aria-hidden="true" />;

  if (!user) {
    return (
      <Link className="auth-control" to="/login">
        <LogIn size={15} />
        Masuk
      </Link>
    );
  }

  return (
    <div className="auth-control-group">
      <span className="auth-user" title={user.email}>
        <UserRound size={15} />
        {user.name || user.email}
      </span>
      <button className="auth-control auth-control-button" type="button" onClick={() => void logout()}>
        <LogOut size={15} />
        Keluar
      </button>
    </div>
  );
}
