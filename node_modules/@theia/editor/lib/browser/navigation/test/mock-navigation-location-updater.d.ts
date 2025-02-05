import { Range } from '../navigation-location';
import { NavigationLocationUpdater } from '../navigation-location-updater';
/**
 * Navigation location updater with increased method visibility for testing.
 */
export declare class MockNavigationLocationUpdater extends NavigationLocationUpdater {
    contained(subRange: Range, range: Range): boolean;
}
/**
 * NOOP navigation location updater for testing. Use this, if you want to avoid any
 * location updates during the tests.
 */
export declare class NoopNavigationLocationUpdater extends NavigationLocationUpdater {
    affects(): false;
}
//# sourceMappingURL=mock-navigation-location-updater.d.ts.map