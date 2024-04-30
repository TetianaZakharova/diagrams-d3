import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import tabs from "../tabs.json";
import './routesComponent.scss'

export const RoutesComponent = () => {
  const [homeComponent, setHomeComponent] = useState();
  const componentName = (tab) => {
    return tab.id.charAt(0).toUpperCase() + tab.id.slice(1);
  };

  const LazyImport = (currectComponent, tab) => {
    return (currectComponent = lazy(() => import(`../${tab.path}`)));
  };

  useEffect(() => {
    const homeTab = tabs.sort((a, b) => a.order - b.order)[0];
    const homeComp = componentName(homeTab);
    setHomeComponent(homeComp);
  }, []);

  return (
    <div className="tab-content">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {tabs.map((tab) => {
            const TabComponent = componentName(tab);
            const TabLazyComp = LazyImport(TabComponent, tab);
            const HomeLazyComp = LazyImport(homeComponent, tab);

            return (
              <Route key="0" path="/" element={<HomeLazyComp />}>
                <Route
                  key={tab.id}
                  path={`/${tab.id}`}
                  element={<TabLazyComp />}
                />
              </Route>
            );
          })}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};
