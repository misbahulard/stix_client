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
    exact: true,
    component: ObservedData
  },
  {
    path: "/indicator",
    exact: true,
    component: Indicator
  },
  {
    path: "/identity",
    exact: true,
    component: Identity
  },
  {
    path: "/threat-actor",
    exact: true,
    component: ThreatActor
  },
  {
    path: "/attack-pattern",
    exact: true,
    component: AttackPattern
  },
  {
    path: "/bundle",
    exact: true,
    component: Bundle
  },
  {
    path: "/bundle/:id",
    exact: true,
    component: Bundle
  }
];

export default routes;