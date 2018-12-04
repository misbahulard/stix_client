/**
 * route.js
 * berfungsi sebagai tempat routing dari aplikasi, disini didefinisikan komponen beserta rutenya.
 * @module route
 * @returns {object} routes - rute object
 */
import Dashboard from './components/stix/Dashboard';
import ObservedData from './components/stix/ObservedData';
import Indicator from './components/stix/Indicator';
import Identity from './components/stix/Identity';
import ThreatActor from './components/stix/ThreatActor';
import AttackPattern from './components/stix/AttackPattern';
import Bundle from './components/stix/Bundle';

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