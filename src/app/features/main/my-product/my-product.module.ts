import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProductRoutingModule } from './my-product-routing.module';
import { MyProductLayoutComponent } from './components/my-product-layout/my-product-layout.component';
import { AssetsManagementSystemComponent } from './pages/assets-management-system/assets-management-system.component';
import { SharedModule } from '../../shared/shared.module';
import { PotholesDetectionComponent } from './pages/potholes-detection/potholes-detection.component';
import { VehicleTrafficDetectionComponent } from './pages/vehicle-traffic-detection/vehicle-traffic-detection.component';
import { GarbageDetectionComponent } from './pages/garbage-detection/garbage-detection.component';
import { IllegalParkingMonitoringComponent } from './pages/illegal-parking-monitoring/illegal-parking-monitoring.component';
import { VehicleCollisionDetectionComponent } from './pages/vehicle-collision-detection/vehicle-collision-detection.component';
import { PpeMonitoringComponent } from './pages/ppe-monitoring/ppe-monitoring.component';
import { EmeregencyModuleComponent } from './pages/emeregency-module/emeregency-module.component';
import { CleanlinessMonitoringComponent } from './pages/cleanliness-monitoring/cleanliness-monitoring.component';
import { CriticalAreaMonitoringComponent } from './pages/critical-area-monitoring/critical-area-monitoring.component';
import { TaskManagementSystemComponent } from './pages/task-management-system/task-management-system.component';
import { RemoteSensingComponent } from './pages/remote-sensing/remote-sensing.component';
import { SharpGisComponent } from './pages/sharp-gis/sharp-gis.component';
import { DroneSolutionsComponent } from './pages/drone-solutions/drone-solutions.component';
import { FleetManagementSystemComponent } from './pages/fleet-management-system/fleet-management-system.component';
import { MdvrSolutionsComponent } from './pages/mdvr-solutions/mdvr-solutions.component';
import { DepotManagementSystemComponent } from './pages/depot-management-system/depot-management-system.component';
import { HumanResourceManagementSystemComponent } from './pages/human-resource-management-system/human-resource-management-system.component';


@NgModule({
  declarations: [
    MyProductLayoutComponent,
    AssetsManagementSystemComponent,
    PotholesDetectionComponent,
    VehicleTrafficDetectionComponent,
    GarbageDetectionComponent,
    IllegalParkingMonitoringComponent,
    VehicleCollisionDetectionComponent,
    PpeMonitoringComponent,
    EmeregencyModuleComponent,
    CleanlinessMonitoringComponent,
    CriticalAreaMonitoringComponent,
    TaskManagementSystemComponent,
    RemoteSensingComponent,
    SharpGisComponent,
    DroneSolutionsComponent,
    FleetManagementSystemComponent,
    MdvrSolutionsComponent,
    DepotManagementSystemComponent,
    HumanResourceManagementSystemComponent
  ],
  imports: [
    CommonModule,
    MyProductRoutingModule,
    SharedModule
  ]
})
export class MyProductModule { }
