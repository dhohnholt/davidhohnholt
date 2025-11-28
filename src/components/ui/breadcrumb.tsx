import { useNavigate } from "react-router-dom";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {crumb.href ? (
              <button
                onClick={() => navigate(crumb.href!)}
                className="bg-transparent text-gray-600 hover:text-[#014040] hover:underline transition-colors"
              >
                {crumb.label}
              </button>
            ) : (
              <span className="text-gray-700 font-medium truncate">
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