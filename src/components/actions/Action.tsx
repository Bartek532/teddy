import { memo } from "react";
import { Link } from "react-router-dom";

import type { Action as ActionType } from "../../utils/types";

interface ActionProps {
  readonly action: ActionType;
}

export const Action = memo<ActionProps>(({ action }) => {
  return (
    <li className="flex w-full">
      <Link
        to={`/actions/edit/${action.id}`}
        className="group flex w-full justify-center items-center border-2 border-blue-100 rounded-2xl p-2.5 gap-3.5 overflow-hidden transition-opacity hover:underline"
      >
        <span>{action.name}</span>
      </Link>
    </li>
  );
});

Action.displayName = "Action";
