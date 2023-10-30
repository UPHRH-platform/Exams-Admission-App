import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrServiceService } from 'src/app/shared/services/toastr/toastr.service';

@Component({
  selector: 'app-generate-results-pdf',
  templateUrl: './generate-results-pdf.component.html',
  styleUrls: ['./generate-results-pdf.component.scss']
})
export class GenerateResultsPdfComponent implements OnInit{

  studentDetails: any;
  examTableHeader = [
    {
      header: 'Name of exam',
      columnDef: 'examName',
      cell: (element: Record<string, any>) => `${element['examName']}`,
      cellStyle: {
        'background-color': '#0000000a',
        'color': '#00000099'
      }
    },{
      header: 'Internal mark',
      columnDef: 'internalMarks',
      cell: (element: Record<string, any>) => `${element['internalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'External mark',
      columnDef: 'externalMarks',
      cell: (element: Record<string, any>) => `${element['externalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Total marks',
      columnDef: 'totalMarks',
      cell: (element: Record<string, any>) => `${element['totalMarks']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },{
      header: 'Status',
      columnDef: 'result',
      cell: (element: Record<string, any>) => `${element['result']}`,
      cellStyle: {
        'background-color': '#0000000a', 'width': '135px', 'color': '#00000099'
      }
    },
  ];
  examTableData: any;
  isHallTicket = true;

  constructor(
    public dialogRef: MatDialogRef<GenerateResultsPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrServiceService
  ) {
    this.studentDetails = this.data.studentDetails;
    this.examTableData = this.data.examTableData;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.downloadPdf()
    }, 100)
  }

  downloadPdf() {
    const element = document.getElementById('pdf-content');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.20, canvas.height * 0.40);
        pdf.save(`${this.studentDetails.firstName}.pdf`);
        this.toastrService.showToastr('Results downloaded successfully', 'Success', 'success')
        this.dialogRef.close()
      });
    }
  }

}
