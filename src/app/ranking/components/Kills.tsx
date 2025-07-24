import React from 'react';

interface KillsProps {
  itemsClass: string;
  itemsTopClass: string;
}

const Kills: React.FC<KillsProps> = ({ itemsClass, itemsTopClass }) => {
  return (
    <div className="kills flex flex-col items-left mt-12 w-full max-w-[500px]">
      <h2 className="text-base font-bold">
        PVP
      </h2>
      <table className="table-fixed w-full border-collapse border border-white bg-black mt-6 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={itemsTopClass}>Kills</th>
            <th className={itemsTopClass}>Player</th>
            <th className={itemsTopClass}>Guild</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={itemsTopClass}>165</td>
            <td className={itemsTopClass}>Itachi</td>
            <td className={`${itemsTopClass} text-[red]`}>Guild 1</td>
          </tr>
          <tr>
            <td className={itemsTopClass}>152</td>
            <td className={itemsTopClass}>Kabuto</td>
            <td className={itemsTopClass}>Guild 2</td>
          </tr>
          <tr>
            <td className={itemsTopClass}>140</td>
            <td className={itemsTopClass}>Kakashi</td>
            <td className={itemsTopClass}>Guild 3</td>
          </tr>
          <tr>
            <td className={itemsClass}>139</td>
            <td className={itemsClass}>Zabuza</td>
            <td className={itemsClass}>Guild 2</td>
          </tr>
          <tr>
            <td className={itemsClass}>116</td>
            <td className={itemsClass}>Shino</td>
            <td className={itemsClass}>Guild 1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Kills;