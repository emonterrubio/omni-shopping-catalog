import React from 'react';
import { MonitorOptionCard } from './MonitorOptionCard';

export function MonitorSelectionList() {
  return (
    <div className="flex flex-col gap-4">
      <MonitorOptionCard name={'Dell UltraSharp 27" 4K'} details={'27" 4K UHD, USB-C'} eligible />
      <MonitorOptionCard name={'LG 34" Ultrawide'} details={'34" WQHD, 144Hz'} eligible />
      <MonitorOptionCard name={'Samsung 32" Curved'} details={'32" QHD, Curved'} eligible />
    </div>
  );
} 