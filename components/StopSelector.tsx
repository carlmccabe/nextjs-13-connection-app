import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import DataSet from '@/data'

interface Stop {
  id: string;
  title: string;
  mode: string
}

interface StopSelectorProps {
  stops: Stop[];
  onSave: (selectedId: string) => void;
}

interface StopSelectorsProps {
  stopIds: string[];
  setStopIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const StopSelector: React.FC<StopSelectorProps> = ({ stops, onSave }) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleSave = (selectedId: string) => {
    setSelectedId(selectedId)
    onSave(selectedId);
  };

  return (
    <div>
      <select value={selectedId} onChange={(e) => handleSave(e.target.value)}>
        <option value="">Select an option</option>
        {stops.map((stop) => (
          <option key={stop.id} value={stop.id}>
            {stop.title}
          </option>
        ))}
      </select>
    </div>
  );
};

const StopSelectors: React.FC<StopSelectorsProps> = ({
    stopIds,
    setStopIds,
  }) => {
  const stops: Stop[] = DataSet.stops;
  const newStopDisabled = stopIds.length >= 3;

  const handleStopSave = (selectedId: string) => {
    setStopIds([...stopIds, selectedId]);
  };

  const handleRemoveStop = (index: number) => {
    const newStopIds = [...stopIds];
    newStopIds.splice(index, 1);
    setStopIds(newStopIds);
  };

  const renderStopSelectors = () => {
    const maxStopSelectors = 3;
    return stopIds.slice(0, maxStopSelectors).map((id, index) => (
      <div className='flex' key={index}>
        <StopSelector stops={stops} onSave={handleStopSave} />
        <Button onClick={() => handleRemoveStop(index)}>Remove</Button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Select Stops</h2>
      {renderStopSelectors()}
      <Button disabled={newStopDisabled} onClick={() => setStopIds([...stopIds, ''])}>Add New Stop</Button>
      {/* <pre>{JSON.stringify(stopIds, null, 2)}</pre> */}
    </div>
  );
};

export default StopSelectors;
