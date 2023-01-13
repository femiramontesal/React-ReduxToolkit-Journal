import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { FirebaseAuth } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../hooks";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { logout, login } from "../store/auth";
import { CheckingAuth } from "../ui/components/CheckingAuth";

export const AppRouter = () => {


  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
      {/* Login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
