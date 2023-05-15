import { memo } from "react";
import * as icons from "react-icons/all";

import type { IconBaseProps } from "react-icons/lib";

interface IconProps {
  name: string;
  props?: IconBaseProps;
}

export const Icon = memo<IconProps>(({ name, props }) => {
  // eslint-disable-next-line import/namespace
  const ElementIcon = icons[name as keyof typeof icons];

  if (!ElementIcon) {
    return <span>...</span>;
  }

  return <ElementIcon {...props} />;
});

Icon.displayName = "Icon";
