import { Component, Input } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
   @Input() isHome: boolean = false;
  faqList1 = [
    { question: 'FAQ.QUESTION1', answer: 'FAQ.ANSWER1', delay: '0.1s' },
    { question: 'FAQ.QUESTION2', answer: 'FAQ.ANSWER2', delay: '0.2s' },
    { question: 'FAQ.QUESTION3', answer: 'FAQ.ANSWER3', delay: '0.3s' },
    { question: 'FAQ.QUESTION4', answer: 'FAQ.ANSWER4', delay: '0.4s' },
  ];

  faqList2 = [
    { question: 'FAQ.QUESTION5', answer: 'FAQ.ANSWER5', delay: '0.5s' },
    { question: 'FAQ.QUESTION6', answer: 'FAQ.ANSWER6', delay: '0.6s' },
    { question: 'FAQ.QUESTION7', answer: 'FAQ.ANSWER7', delay: '0.7s' },
    { question: 'FAQ.QUESTION8', answer: 'FAQ.ANSWER8', delay: '0.8s' },
  ];
}
