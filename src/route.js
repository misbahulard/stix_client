import Dashboard from './components/Dashboard';
import ObservedData from './components/ObservedData';
import Indicator from './components/Indicator';
import Identity from './components/Identity';
import ThreatActor from './components/ThreatActor';
import AttackPattern from './components/AttackPattern';
import Bundle from './components/Bundle';

const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard
  },
  {
    path: "/observed-data",
    component: ObservedData
  },
  {
    path: "/indicator",
    component: Indicator
  },
  {
    path: "/identity",
    component: Identity
  },
  {
    path: "/threat-actor",
    component: ThreatActor
  },
  {
    path: "/attack-pattern",
    component: AttackPattern
  },
  {
    path: "/bundle",
    component: Bundle
  },
  // {
  //   path: "/bundle/:id",
  //   component: Bundle
  // }
];

export default routes;