export default function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className={`text-4xl font-bold mt-4 ${color}`}>
        {value}
      </p>

    </div>
  );
}