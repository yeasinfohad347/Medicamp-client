import { Link } from "react-router";

const CampCard = ({ camp }) => {
  return (
    <div className="card  bg-base-100 shadow-sm border-l-4 border-primary hover:shadow-md transition">
      <figure className="h-48 overflow-hidden">
        <img
          src={camp.image}
          alt={camp.name}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body p-4 space-y-1">
        <h2 className="card-title text-lg">
          {camp.name}
          {camp.participantCount > 50 && (
            <div className="badge badge-secondary">Popular</div>
          )}
        </h2>
        <p className="text-sm">
          <span className="font-semibold">Date:</span> {camp.date}, {camp.time}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Location:</span> {camp.location}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Fee:</span> ${camp.fee}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Participants:</span>{" "}
          {camp.participantCount}
        </p>
        <div className="card-actions justify-between pt-2">
          <div className="badge badge-outline text-xs">
            {camp.healthcareProfessional}
          </div>
          <Link
            to={`/camp-details/${camp._id}`}
            className="btn btn-sm btn-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
