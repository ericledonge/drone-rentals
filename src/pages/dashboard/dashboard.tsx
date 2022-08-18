import './dashboard.scss';

import React from 'react';

import DashboardControls from '../../components/dashboard-controls/dashboard-controls';
import Timer from '../../components/timer/timer';
import { StateAndDispatch } from '../../domain/reducers/reducers';
import { useMonitorARental } from '../../hooks/useMonitorARental';

const Dashboard = ({ state, dispatch }: StateAndDispatch) => {
  const {
    stations,
    selectedStation,
    setSelectedStation,
    quadRented,
    startDate,
    endDate,
    onLanding,
    isCrashed,
    onCrashing,
  } = useMonitorARental({ state, dispatch });

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div>{`${quadRented.manufacturer}, ${quadRented.model}`}</div>

      {isCrashed ? (
        <div>Crashed</div>
      ) : (
        <Timer startDate={startDate} endDate={endDate} onCrashing={onCrashing} />
      )}

      <DashboardControls
        onLanding={onLanding}
        onCrashing={onCrashing}
        stations={stations}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        isCrashed={isCrashed}
      />
    </div>
  );
};

export default Dashboard;
