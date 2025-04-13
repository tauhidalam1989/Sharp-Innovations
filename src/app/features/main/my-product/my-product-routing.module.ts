import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductLayoutComponent } from './components/my-product-layout/my-product-layout.component';
import { AssetsManagementSystemComponent } from './pages/assets-management-system/assets-management-system.component';
import { CriticalAreaMonitoringComponent } from './pages/critical-area-monitoring/critical-area-monitoring.component';
import { DepotManagementSystemComponent } from './pages/depot-management-system/depot-management-system.component';
import { DroneSolutionsComponent } from './pages/drone-solutions/drone-solutions.component';
import { EmeregencyModuleComponent } from './pages/emeregency-module/emeregency-module.component';
import { FleetManagementSystemComponent } from './pages/fleet-management-system/fleet-management-system.component';
import { GarbageDetectionComponent } from './pages/garbage-detection/garbage-detection.component';
import { HumanResourceManagementSystemComponent } from './pages/human-resource-management-system/human-resource-management-system.component';
import { IllegalParkingMonitoringComponent } from './pages/illegal-parking-monitoring/illegal-parking-monitoring.component';
import { MdvrSolutionsComponent } from './pages/mdvr-solutions/mdvr-solutions.component';
import { PotholesDetectionComponent } from './pages/potholes-detection/potholes-detection.component';
import { PpeMonitoringComponent } from './pages/ppe-monitoring/ppe-monitoring.component';
import { RemoteSensingComponent } from './pages/remote-sensing/remote-sensing.component';
import { TaskManagementSystemComponent } from './pages/task-management-system/task-management-system.component';
import { VehicleCollisionDetectionComponent } from './pages/vehicle-collision-detection/vehicle-collision-detection.component';
import { VehicleTrafficDetectionComponent } from './pages/vehicle-traffic-detection/vehicle-traffic-detection.component';
import { SharpGisComponent } from './pages/sharp-gis/sharp-gis.component';

const routes: Routes = [

  {
    path: "",
    component: MyProductLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "profile",
      },
      {
        path: "assets-management-system",
        component: AssetsManagementSystemComponent,
      },
      {
        path: "cleanliness-monitoring",
        component: AssetsManagementSystemComponent,
      },
      {
        path:"critical-area-monitoring",
        component:CriticalAreaMonitoringComponent
      },
      {
        path:"depot-management-system",
        component:DepotManagementSystemComponent
      },
      {
        path:"drone-solutions",
        component:DroneSolutionsComponent
      },
      {
        path:"emeregency-module",
        component:EmeregencyModuleComponent
      },
      {
        path:"fleet-management-system",
        component:FleetManagementSystemComponent
      },
      {
        path:"garbage-detection",
        component:GarbageDetectionComponent
      },
      {
        path:"human-resource-management-system",
        component:HumanResourceManagementSystemComponent
      },
      {
        path:"illegal-parking-monitoring",
        component:IllegalParkingMonitoringComponent
      },
      {
        path:"mdvr-solutions",
        component:MdvrSolutionsComponent
      },
      {
        path:"potholes-detection",
        component:PotholesDetectionComponent
      },
      {
        path:"ppe-monitoring",
        component:PpeMonitoringComponent
      },
      {
        path:"remote-sensing",
        component:RemoteSensingComponent
      },
      {
        path:"task-management-system",
        component:TaskManagementSystemComponent
      },
      {
        path:"vehicle-collision-detection",
        component:VehicleCollisionDetectionComponent
      },
      {
        path:"vehicle-traffic-detection",
        component:VehicleTrafficDetectionComponent
      },
      {
        path:"sharp-gis",
        component:SharpGisComponent
      },
      
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProductRoutingModule { }
