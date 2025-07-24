import React from 'react';

interface CastlesProps {
  itemsClass: string;
  itemsTopClass: string;
}

const Castles: React.FC<CastlesProps> = ({ itemsClass, itemsTopClass }) => {
  return (
    <div className="castles flex flex-col items-left mt-12 w-full max-w-[500px]">
      <h2 className="text-base font-bold">
        Siege Affair
      </h2>
      <table className="table-fixed w-full border-collapse border border-white bg-black mt-6 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={itemsTopClass}>Castles</th>
            <th className={itemsTopClass}>Guild</th>
            <th className={itemsTopClass}>Leader</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={itemsTopClass}>165</td>
            <td className={itemsTopClass}>Guild 1</td>
            <td className={itemsTopClass}>Itachi</td>
          </tr>
          <tr>
            <td className={itemsClass}>152</td>
            <td className={itemsClass}>Guild 2</td>
            <td className={itemsClass}>Kabuto</td>
          </tr>
          <tr>
            <td className={itemsClass}>140</td>
            <td className={itemsClass}>Guild 3</td>
            <td className={itemsClass}>Kakashi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Castles;