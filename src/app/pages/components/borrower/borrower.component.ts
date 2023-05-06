import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/service/api.servies.mock';

@Component({
  selector: 'borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss']
})
export class BorrowerComponent implements OnInit {
  borrowerDetails: any;
  collateralDetails: any[];
  loanDetails: any[];
  isloading: boolean;
  totalValue: number = 0;

  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isloading = true
    this.route.params.subscribe((params) => {
      let urldetails: any = params
      if (urldetails.id) {
        this.getBorrowerDetails(urldetails.id)
      }
    });
  }

  getBorrowerDetails(id: string) {
    this.apiService.getBorrowersById(id).subscribe(e => {
      this.borrowerDetails = e
      this.getCollateralDetails(id)
    })
  }

  getCollateralDetails(id: string) {
    const filter = { where: { borrowerId: id } }
    this.apiService.getCollateral(filter).subscribe(e => {
      this.collateralDetails = e
      e.forEach((element: any) => {
        console.log(element.value)
        this.totalValue = this.totalValue + Number(element.value)
      });
      this.getLoanDetails(id)
    })
  }

  getLoanDetails(id: string) {
    const filter = { where: { borrowerId: id } }
    this.apiService.getLoan(filter).subscribe(e => {
      this.loanDetails  = e
      this.isloading = false
    })
  }

}
