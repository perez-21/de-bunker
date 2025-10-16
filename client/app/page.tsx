"use client"

import { useState } from "react";
import { mockVaultData } from "@/app/shared/mock";
import { VaultEntry } from "./shared/types";
import { VaultScreen, LoginScreen } from "./components";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [vaultData, setVaultData] = useState(mockVaultData);

  const handleLogin = (password: string) => {
    console.log('Login successful! Key derived and session set.');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Vault locked and session cleared.');
    setIsLoggedIn(false);
  };
  
  // Function to handle updates from the detail modal
  const handleUpdateEntry = (updatedEntry: VaultEntry) => {
    setVaultData(prevData => {
      const existingIndex = prevData.findIndex(e => e.id === updatedEntry.id);
      
      if (existingIndex > -1) {
        // Update existing entry
        const newVault = [...prevData];
        newVault[existingIndex] = updatedEntry;
        console.log(`Updated entry: ${updatedEntry.name}`);
        return newVault;
      } else {
        // Add new entry (for the "Add New" button flow)
        console.log(`Added new entry: ${updatedEntry.name}`);
        return [updatedEntry, ...prevData];
      }
    });
  };


  return (
      <>{isLoggedIn ? (
        <VaultScreen entries={vaultData} onLogout={handleLogout} onUpdateEntry={handleUpdateEntry} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}</>
  );
};