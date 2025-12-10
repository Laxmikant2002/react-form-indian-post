interface PostOfficeCardProps {
  name: string;
  branchType: string;
  deliveryStatus: string;
  district: string;
  division: string;
}

export default function PostOfficeCard({
  name,
  branchType,
  deliveryStatus,
  district,
  division,
}: PostOfficeCardProps) {
  return (
    <div className="border border-gray-800 rounded-md p-5 space-y-2 bg-white">
      <p className="text-base text-gray-800">
        <span className="font-normal">Name: </span>{name}
      </p>
      <p className="text-base text-gray-800">
        <span className="font-normal">Branch Type: </span>{branchType}
      </p>
      <p className="text-base text-gray-800">
        <span className="font-normal">Delivery Status: </span>{deliveryStatus}
      </p>
      <p className="text-base text-gray-800">
        <span className="font-normal">District: </span>{district}
      </p>
      <p className="text-base text-gray-800">
        <span className="font-normal">Division: </span>{division}
      </p>
    </div>
  );
}