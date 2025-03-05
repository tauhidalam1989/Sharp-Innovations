import { Component, Input } from '@angular/core';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
   @Input() isHome: boolean = false;
  projectList = [
    {
      image: '../../../../assets/img/project-1.jpg',
      category: 'PROJECT.CATEGORY_ROBOTIC',
      title: 'PROJECT.TITLE_ROBOTIC',
      link: '/projects/robotic-automation',
      delay: '0.3s',
    },
    {
      image: '../../../../assets/img/project-2.jpg',
      category: 'PROJECT.CATEGORY_MACHINE_LEARNING',
      title: 'PROJECT.TITLE_MACHINE_LEARNING',
      link: '/projects/machine-learning',
      delay: '0.5s',
    },
    {
      image: '../../../../assets/img/project-3.jpg',
      category: 'PROJECT.CATEGORY_PREDICTIVE',
      title: 'PROJECT.TITLE_PREDICTIVE',
      link: '/projects/predictive-analysis',
      delay: '0.7s',
    },
  ];
}
