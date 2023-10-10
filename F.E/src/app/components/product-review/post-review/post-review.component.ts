import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/reviews/reviews.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {

  constructor(private router: ActivatedRoute, private reviewService: ReviewService, private navigate: Router) { }

  ratingForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(400)])
  })


  ngOnInit(): void {
  }

  // method to post a review for a paticular product
  onSubmit() {
    const review = {
      reviewId: this.router.snapshot.params['id']!,
      rating: parseInt(this.ratingForm.value.rating!),
      title: this.ratingForm.value.title!,
      description: this.ratingForm.value.description!
    }
    this.reviewService.addReview(review).subscribe((response) => {
      Swal.fire({
        icon: "success",
        title: "Review Added",
        text: "Thank you for your time!",
        timer: 2500,
        showConfirmButton: true
      })
      this.navigate.navigate(['view-product/' + this.router.snapshot.params['id']]).then(() => {
        window.location.reload();
      })
    })
  }

}
