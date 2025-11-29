import { useNavigate } from "react-router-dom";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
  textColor?: string;
}

export default function Breadcrumb({
  crumbs,
  textColor,
}: BreadcrumbProps) {
  const textColorClass = textColor ?? "text-gray-500";
  const navigate = useNavigate();

  return (
    <nav
      className={`text-sm ${textColorClass} mb-6`}
      aria-label="breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {crumb.href ? (
              <button
                onClick={() => navigate(crumb.href!)}
                className={`bg-transparent text-inherit hover:text-amber-400 hover:underline transition-colors`}
              >
                {crumb.label}
              </button>
            ) : (
              <span className="font-medium truncate text-inherit">
                {crumb.label}
              </span>
            )}
            {index < crumbs.length - 1 && (
              <span className="text-gray-400 select-none">{">"}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
