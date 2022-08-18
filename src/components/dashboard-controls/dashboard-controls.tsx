import './dashboard-controls.scss';

import React from 'react';
import Select from 'react-select';

import { SelectItem } from '../../domain/models/models';

type DashboardControlsProps = {
  onLanding: () => void;
  onCrashing: () => void;
  stations: SelectItem[];
  selectedStation: SelectItem;
  setSelectedStation: (station: SelectItem) => void;
  isCrashed: boolean;
};

const DashboardControls = ({
  onLanding,
  onCrashing,
  stations,
  selectedStation,
  setSelectedStation,
  isCrashed,
}: DashboardControlsProps) => {
  return (
    <div className="dashboard-controls">
      <div className="dashboard-controls__landing-section">
        <button onClick={onLanding} disabled={isCrashed} className="">
          Declare a landing
        </button>

        <Select
          value={selectedStation}
          options={stations}
          onChange={(station) => {
            setSelectedStation(station!);
          }}
          isDisabled={isCrashed}
          placeholder="Station"
        />
      </div>

      <div className="">
        <button onClick={onCrashing} disabled={isCrashed} className="">
          Declare a crash
        </button>
      </div>
    </div>
  );
};

export default DashboardControls;
