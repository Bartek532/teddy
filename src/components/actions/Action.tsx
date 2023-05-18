import { memo } from "react";
import { Link } from "react-router-dom";

import { Icon } from "../common/Icon";

import type { Action as ActionType } from "../../utils/types";

interface ActionProps {
  readonly action: ActionType;
}

const iconProps = {
  size: 22,
};

export const Action = memo<ActionProps>(({ action }) => {
  return (
    <li className="flex w-full">
      <Link
        to={`/actions/edit/${action.id}`}
        className="group flex w-full justify-center items-center border-2 border-blue-100 rounded-2xl p-[9px] gap-3.5 overflow-hidden transition-opacity hover:underline"
      >
        <Icon name={action.icon} props={iconProps} />
        <span className="truncate max-w-[85%] text-sm">{action.name}</span>
      </Link>
    </li>
  );
});

Action.displayName = "Action";
