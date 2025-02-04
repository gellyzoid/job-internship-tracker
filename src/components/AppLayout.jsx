import { Flowbite, Footer } from "flowbite-react";
import AppContainer from "./AppContainer";
import { AppHeader } from "./AppHeader";
import { useState } from "react";

function AppLayout() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Flowbite>
      <div className="bg-slate-200 dark:bg-gray-900">
        <AppHeader openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <div className="mt-[60px] flex h-screen flex-col">
          <AppContainer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </div>
      </div>
    </Flowbite>
  );
}

export default AppLayout;
