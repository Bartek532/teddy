import { createBrowserRouter } from "react-router-dom";

import { HomeView } from "./home/page";
import { SettingsView } from "./settings/page";
import { AddSnippetView } from "./snippets/add/page";
import { EditSnippetView } from "./snippets/edit/page";
import { SnippetsView } from "./snippets/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/settings",
    element: <SettingsView />,
  },
  {
    path: "/snippets",
    element: <SnippetsView />,
  },
  {
    path: "/snippets/add",
    element: <AddSnippetView />,
  },
  {
    path: "/snippets/edit/:id",
    element: <EditSnippetView />,
  },
]);
