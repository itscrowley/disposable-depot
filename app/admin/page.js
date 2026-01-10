"use client";
import React from 'react';
import { useAdminLogic } from './hooks/useAdminLogic'; 
import AdminUI from './components/AdminUI';   

export default function AdminPanel() {
  // 1. Logic (Hook) ko call kiya
  const { state, actions } = useAdminLogic();

  // 2. Data ko Design (UI) mein bhej diya
  return (
    <AdminUI state={state} actions={actions} />
  );
}