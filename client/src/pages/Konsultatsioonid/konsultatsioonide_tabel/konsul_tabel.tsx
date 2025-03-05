
const Konsul_tabel = () => {
    return (
        <div className="overflow-x-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Aly Valvas</h2>
         
          <div className="flex justify-center items-center gap-2 mb-2 border border-black p-2">
                <button className="p-1">&lt;</button>
                <span className="text-lg">20.01-26.01 2025</span>
                <button className="p-1">&gt;</button>
            </div>


          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Aeg</th>
                <th className="border p-2">Esmaspäev</th>
                <th className="border p-2">Teisipäev</th>
                <th className="border p-2">Kolmapäev</th>
                <th className="bo   rder p-2">Neljapäev</th>
                <th className="border p-2">Reede</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">8:30-10:00</td>
                <td className="border p-2 "></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="border p-2">10:15-11:45</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="border p-2">11:55-14:00</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="border p-2">14:10-15:40</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2 "></td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="border p-2">15:45-17:15</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
}

export default Konsul_tabel
