import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/shared';
import { AuthServiceService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from 'src/app/service/base.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CctvApprovalPopupComponent } from '../../../shared/components/cctv-approval-popup/cctv-approval-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/app/shared/components/conformation-dialog/conformation-dialog.component';

@Component({
  selector: 'app-student-enrollment-form',
  templateUrl: './student-enrollment-form.component.html',
  styleUrls: ['./student-enrollment-form.component.scss'],
})
export class StudentEnrollmentFormComponent {
  links = ['Basic Details', 'Educational Details'];
  genderList = ['Male', 'Female', 'Others'];
  casteList = ['General', 'SC', 'ST', 'OBC', 'None'];
  categoryList = ['Freedom Fighter Dependant', 'Handicapped'];
  centersList = [{id: 434, name: 'Lucknow Centre'}];
  courseList = [{id: 31, name: 'AUXILIARY NURSE AND MIDWIFE'}];
  examBatchList: [] = [];
  intermediateStreamList: [] = [];
  intermediatePassedBoardList: [] = [];
  intermediateSubjectsList:any = [];
  selectedLink: string = 'Basic Details';
  basicDetailsForm: FormGroup;
  educationalDetailsForm: FormGroup;
  basicDetails: boolean = true;
  educationalDetails: boolean = false;
  fileUploadError: string;
  loggedInUserRole: any;
  enrollmentId: any;
  breadcrumbItems = [
    { label: 'Student Enrollment', url: '' },
  ]
  isAdmin: boolean = false;
  enrollmentDetails: any = [];
  showRejectDialog = false;
  admissionSessionList: string[] = [];
  currentFY:string;
  centerDetails="INS-301 - Institute Name";
  isCreateView: boolean = true;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private authService: AuthServiceService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    this.route.params.subscribe((param) => {
      if(param['id']) {
        this.enrollmentId = param['id'];
      } 
    })
  }
  iseditable: boolean = true;
  ngOnInit() {
    this.loggedInUserRole = this.authService.getUserRoles()[0];
    this.getAdmissionSessionList();
    this.getExamCycleList();
    this.getIntermediateSubjects();
    this.getIntermediateStreams();
    this.getIntermediatePassedBoard();
    this.initBasicDetailsForm();
    this.initEducationalDetailsForm();
    if(this.enrollmentId !== undefined) {
      this.isCreateView = false;
      this.getEnrollmentDetails();
    }
    
  }

  initBasicDetailsForm() {
    this.basicDetailsForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mothersName: new FormControl('', Validators.required),
      fathersName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      caste: new FormControl('', Validators.required),
      category: new FormControl(''),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern(`^[0-9]*$`)]),
      emailId: new FormControl('', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")),
      aadharNo: new FormControl('', Validators.pattern(`^[0-9]*$`)),
      address: this.formBuilder.group({
        addressLine1: new FormControl(''),
        district: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required)
      })
    })
  }

  initEducationalDetailsForm() {
    this.educationalDetailsForm = this.formBuilder.group({
      centerCode: new FormControl('INS-301'),
      courseCode: new FormControl(''),
      sessionOfAdmission: new FormControl(this.currentFY, Validators.required), //yearpicker
      examBatch: new FormControl('', Validators.required),// month and year picker
      admissionDate: new FormControl('', Validators.required),
      intermediateStream: new FormControl('', Validators.required),
      intermediatePassedBoard: new FormControl(''),
      intermediateSubjects: new FormControl(''),
      intermediatePercentage: new FormControl('', Validators.required),
      highSchoolDocuments: this.formBuilder.group({
        rollNo: new FormControl('', Validators.required),
        yearOfPassing: new FormControl('', Validators.required),
        marksSheet: new FormControl('', Validators.required),
        certificate: new FormControl('', Validators.required) 
      }),
      intermediateDocuments:  this.formBuilder.group({
        rollNo: new FormControl('', Validators.required),
        yearOfPassing: new FormControl('', Validators.required),
        marksSheet: new FormControl('', Validators.required),
        certificate: new FormControl('', Validators.required) 
      })
    })
  }

  assignFormValues() {
    this.basicDetailsForm.patchValue({
      firstName: this.enrollmentDetails?.firstName.trim(),
      lastName: this.enrollmentDetails?.surname.trim(),
      mothersName: this.enrollmentDetails?.motherName.trim(),
      fathersName: this.enrollmentDetails?.fatherName.trim(),
      dateOfBirth: this.enrollmentDetails?.dateOfBirth.trim(),
      gender: this.enrollmentDetails?.gender.trim(),
      caste: this.enrollmentDetails?.caste.trim(),
      category: this.categoryList[0],
      mobileNumber: this.enrollmentDetails?.mobileNo.trim(),
      emailId: this.enrollmentDetails?.emailId.trim(),
      aadharNo: this.enrollmentDetails?.aadhaarNo.trim(),
      address: {
        addressLine1: this.enrollmentDetails?.address.trim(),
        district: this.enrollmentDetails?.district.trim(),
        state: this.enrollmentDetails?.state.trim(),
        country: this.enrollmentDetails?.country.trim(),
        pincode: this.enrollmentDetails?.pinCode.trim(),
      }
    })
    this.educationalDetailsForm.patchValue({
        courseCode: this.enrollmentDetails?.course,
        examBatch: this.enrollmentDetails?.examBatch,
        admissionDate: this.enrollmentDetails?.admissionDate,
        intermediateStream: this.enrollmentDetails?.intermediateStream? this.enrollmentDetails?.intermediateStream: '',
        intermediatePassedBoard: this.enrollmentDetails?.intermediatePassedBoard,
        intermediateSubjects: this.enrollmentDetails?.intermediateSubjects.split(','),
        intermediatePercentage: this.enrollmentDetails?.intermediatePercentage
    })
    this.educationalDetailsForm.controls['highSchoolDocuments'].patchValue({
      rollNo: this.enrollmentDetails?.highSchoolRollNo,
      yearOfPassing:this.enrollmentDetails?.highSchoolYearOfPassing,
        marksSheet: this.enrollmentDetails?.highSchoolMarksheetPath,
        certificate: this.enrollmentDetails?.highSchoolCertificatePath 
    })
    this.educationalDetailsForm.controls['intermediateDocuments'].patchValue({
      rollNo: this.enrollmentDetails?.intermediateRollNo,
      yearOfPassing:this.enrollmentDetails?.intermediateYearOfPassing,
        marksSheet: this.enrollmentDetails?.intermediateMarksheetPath,
        certificate: this.enrollmentDetails?.intermediateCertificatePath
    })
  }

  selectLink(link: string) {
    this.selectedLink = link;
  }

  convertDateFormat(date: any) {
    const dateString = new Date(date);
    // const formattedDate = dateString.getFullYear() + '-' + dateString.getMonth() + '-' + dateString.getDate();
    const formattedDate = dateString.getFullYear()  + '-'
    + ('0' + (dateString.getMonth()+1)).slice(-2) + '-'
    + ('0' + dateString.getDate()).slice(-2);
    return formattedDate;
  }

  compareFn(cmp1: any,cmp2: any){
    return cmp1 && cmp2 ? cmp1.id === cmp2.id : cmp1 == cmp2;
  }
  showInfo(option: any) {
    this.selectLink(option);
    switch (option) {
      case 'Basic Details':
        this.basicDetails = true;
        this.educationalDetails = false;
        break;
      case 'Educational Details':
        this.basicDetails = false;
        this.educationalDetails = true;
        break;
      default:
        return '';
    }
    return;
  }

  next() {
    this.selectedLink = 'Educational Details';
    this.showInfo(this.selectedLink);
    console.log(this.basicDetailsForm.value);
    
  }

  previous() {
    this.selectedLink = 'Basic Details';
    this.showInfo(this.selectedLink);
  }

  formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  handleFileUpload(param: string, event: any) {
    this.fileUploadError = '';
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];
      const extension = selectedFile.name.split('.').pop();
      const fileSize = selectedFile.size;
      const allowedExtensions = ['pdf', 'jpeg', 'jpg', 'png'];
      if (allowedExtensions.includes(extension)) {
        // validate file size to be less than 5mb if the file has a valid extension
        if (fileSize < 5000000) { 
        switch(param) {
          case 'highschool_marksheet': 
            this.educationalDetailsForm.patchValue({
            highSchoolDocuments: {
             marksSheet: selectedFile.name
            }
            })
          break;
          case 'highschool_certificate':
           this.educationalDetailsForm.patchValue({
            highSchoolDocuments: {
             certificate: selectedFile.name
            }
            })
          break;
          case 'intermediate_marksheet':
            this.educationalDetailsForm.patchValue({
              intermediateDocuments: {
                marksSheet: selectedFile.name
              }
              })
          break;
          case 'intermediate_certificate': 
          this.educationalDetailsForm.patchValue({
            intermediateDocuments: {
             certificate: selectedFile.name
            }
            })
          break;
          }
          }
           else {
            //console.log('file already exists');
            this.fileUploadError = 'Please upload files with size less than 5MB';
          }
        } else {
          this.fileUploadError = `Please upload ${allowedExtensions.join(', ')} files`;
        }
        console.log(this.educationalDetailsForm.value);
      }
    }

  removeSelectedFiles(param: string, index: number) {
    switch(param) {
      case 'highschool_marksheet': 
        this.educationalDetailsForm.patchValue({
        highSchoolDocuments: {
         marksSheet: ''
        }
        })
      break;
      case 'highschool_certificate':
       this.educationalDetailsForm.patchValue({
        highSchoolDocuments: {
         certificate: ''
        }
        })
      break;
      case 'intermediate_marksheet':
        this.educationalDetailsForm.patchValue({
          intermediateDocuments: {
            marksSheet: ''
          }
          })
      break;
      case 'intermediate_certificate': 
      this.educationalDetailsForm.patchValue({
        intermediateDocuments: {
         certificate: ''
        }
        })
      break;
      }
    }

    createEnrollment() {
      if(this.basicDetailsForm.valid && this.educationalDetailsForm.valid) {
        const request = {
          centerCode: this.educationalDetailsForm.value.centerCode,
          centerName: this.educationalDetailsForm.value.centerCode.name,
          courseCode: this.educationalDetailsForm.value.courseCode.id,
          courseName: this.educationalDetailsForm.value.courseCode.name,
          session: this.educationalDetailsForm.value.sessionOfAdmission,
          examBatch: this.educationalDetailsForm.value.examBatch,
          admissionDate: this.convertDateFormat(this.educationalDetailsForm.value.admissionDate),
           // has to be modified for format yyyy-mm-dddd 2023-08-15
          firstName: this.basicDetailsForm.value.firstName,
          surname: this.basicDetailsForm.value.lastName, // surname probably reporesent lastname,
          motherName: this.basicDetailsForm.value.mothersName,
          fatherName: this.basicDetailsForm.value.fathersName,
          dateOfBirth: this.convertDateFormat(this.basicDetailsForm.value.dateOfBirth),
          gender: this.basicDetailsForm.value.gender,
          caste: this.basicDetailsForm.value.caste,
          category: this.basicDetailsForm.value.category,
          intermediatePassedBoard: this.educationalDetailsForm.value.intermediatePassedBoard,
          intermediateSubjects: this.educationalDetailsForm.value.intermediateSubjects.join(),
          intermediatePercentage: this.educationalDetailsForm.value.intermediatePercentage,
          mobileNo: this.basicDetailsForm.value.mobileNumber,
          emailId: this.basicDetailsForm.value.emailId,
          aadhaarNo: this.basicDetailsForm.value.aadharNo,
          address: this.basicDetailsForm.controls['address'].value.addressLine1,
          pinCode: this.basicDetailsForm.controls['address'].value.pincode,
          country: this.basicDetailsForm.controls['address'].value.country,
          state: this.basicDetailsForm.controls['address'].value.state,
          district: this.basicDetailsForm.controls['address'].value.district,
          highSchoolRollNo: this.educationalDetailsForm.controls['highSchoolDocuments'].value.rollNo,
          highSchoolYearOfPassing: this.educationalDetailsForm.controls['highSchoolDocuments'].value.yearOfPassing,
          intermediateRollNo: this.educationalDetailsForm.controls['intermediateDocuments'].value.rollNo,
          intermediateYearOfPassing: this.educationalDetailsForm.controls['intermediateDocuments'].value.yearOfPassing,
          highSchoolMarksheet:this.educationalDetailsForm.controls['highSchoolDocuments'].value.marksSheet,
          highSchoolCertificate: this.educationalDetailsForm.controls['highSchoolDocuments'].value.certificate,
          intermediateMarksheet:this.educationalDetailsForm.controls['intermediateDocuments'].value.marksSheet,
          intermediateCertificate: this.educationalDetailsForm.controls['intermediateDocuments'].value.certificate,
        }
        const formData = new FormData();
        for (let [key, value] of Object.entries(request)) {
          formData.append(`${key}`, `${value}`)
          }
        this.baseService.enrollStudent(formData).subscribe({
          next: (res) => {
            const dialogRef = this.dialog.open(ConformationDialogComponent, {
              data: {
                dialogType: 'success',
                description: ['Your New Student Enrollment Application Submitted Successfully'],
                buttons: [
                  {
                    btnText: 'Ok',
                    positionClass: 'center',
                    btnClass: 'btn-full',
                    response: true,
                  },
                ],
              },
              width: '700px',
              height: '400px',
              maxWidth: '90vw',
              maxHeight: '90vh'
            })
            dialogRef.afterClosed().subscribe(res => {
              this.router.navigate(['/student-enrollment/institute']);
            })
          },
          error: (error: HttpErrorResponse) => {
              
          }
        })
      }
    }

    getEnrollmentDetails() {
      const id = this.enrollmentId;
      this.baseService.getStudentDetailsById(id).subscribe({
        next: (res) => {
          this.enrollmentDetails = res.responseData;
          this.assignFormValues();
          if(this.loggedInUserRole === 'exams_institute' && this.enrollmentDetails?.verificationStatus === 'REJECTED') {
            this.iseditable = true;
          }
          else {
            this.iseditable = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error =>", error);
          this.enrollmentDetails = [];
        }
      })
    }

    getIntermediateSubjects() {
      this.baseService.getIntermediateSubjectList().subscribe({
        next:(res) => {
          this.intermediateSubjectsList = res.responseData;
        }
      })
    }

    updateEnrollmentStatus(param:string, remarks?: string) {
      let request: any = {}
      request = {
        id: this.enrollmentId,
        status: param,
        remarks: remarks !== undefined ? remarks : 'ver', // hardcoded as backend is expecting remarks
      }
      this.baseService.updateStudentEnrollmentStatus(request).subscribe({
        next: (res) => {
          this.router.navigate(['/student-enrollment/admin']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }

    rejectStudentEnrollment(event: any) {
      const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
        data: {
          controls: [
          {
              controlLable: 'Add remarks',
              controlName: 'remarks',
              controlType: 'textArea',
              placeholder: 'Type here',
              value: '',
              validators: ['required']
            },
          ],
          buttons: [
            {
              btnText: 'Cancel',
              positionClass: 'left',
              btnClass: 'btn-outline',
              type: 'close'
            },
            {
              btnText: 'Submit',
              positionClass: 'right',
              btnClass: 'btn-full',
              type: 'submit'
            },
          ],
        },
        width: '700px',
        maxWidth: '90vw',
        maxHeight: '90vh'
      })
  
      dialogRef.afterClosed().subscribe((response: any) => {
        if (response) {
          this.updateEnrollmentStatus('REJECTED', response.remarks);
        }
      })
    }

    navigateToList() {
      if(this.loggedInUserRole === 'exams_admin') {
      this.router.navigate(['/student-enrollment/admin']);
      }
      else {
        this.router.navigate(['/student-enrollment/institute']);
      }
    }

    getAdmissionSessionList() {
        const thisYear = (new Date()).getFullYear();
        this.currentFY = [0].map((count) => `${thisYear - count}-${(thisYear - count + 1)}`).join();
        console.log(this.currentFY);
        const yesterYears = [0, 1, 2, 3, 4].map((count) => `${thisYear - count - 1}-${(thisYear - count)}`);
        const aheadYears = [0, -1, -2, -3].map((count) => `${thisYear - count}-${(thisYear - count + 1)}`)
        this.admissionSessionList.push(...yesterYears, ...aheadYears);
        this.admissionSessionList.sort((a, b) => {
          if(a > b) {
            return 1
          }
          else {
            return - 1;
          }
        })
        console.log(this.admissionSessionList);
    }
     
    getExamCycleList() {
      // as of now get all is integrated , we need exam cycle list based on exam batch and course
      this.baseService.getExamCycleList().subscribe({
        next: (res) => {
          this.examBatchList = res.responseData;
          console.log("test =>", this.examBatchList);
        }
      })
    }

    getIntermediateStreams() {
      this.baseService.getIntermediateStreamList().subscribe({
        next: (res) => {
          this.intermediateStreamList = res;
        }
      })
    }

    getIntermediatePassedBoard() {
      this.baseService.getIntermediatePassedBoard().subscribe({
        next: (res) => {
          console.log(res);
          this.intermediatePassedBoardList = res;
        }
      })
    }

    updateEnrollment() {
      if(this.basicDetailsForm.valid && this.educationalDetailsForm.valid) {
        const request = {
          centerCode: this.educationalDetailsForm.value.centerCode,
          centerName: this.educationalDetailsForm.value.centerCode.name,
          courseCode: this.educationalDetailsForm.value.courseCode.id,
          courseName: this.educationalDetailsForm.value.courseCode.name,
          session: this.educationalDetailsForm.value.sessionOfAdmission,
          examBatch: this.educationalDetailsForm.value.examBatch,
          admissionDate: this.convertDateFormat(this.educationalDetailsForm.value.admissionDate),
          firstName: this.basicDetailsForm.value.firstName,
          surname: this.basicDetailsForm.value.lastName,
          motherName: this.basicDetailsForm.value.mothersName,
          fatherName: this.basicDetailsForm.value.fathersName,
          dateOfBirth: this.convertDateFormat(this.basicDetailsForm.value.dateOfBirth),
          gender: this.basicDetailsForm.value.gender,
          caste: this.basicDetailsForm.value.caste,
          category: this.basicDetailsForm.value.category,
          intermediatePassedBoard: this.educationalDetailsForm.value.intermediatePassedBoard,
          intermediateSubjects: this.educationalDetailsForm.value.intermediateSubjects.join(),
          intermediatePercentage: this.educationalDetailsForm.value.intermediatePercentage,
          mobileNo: this.basicDetailsForm.value.mobileNumber,
          emailId: this.basicDetailsForm.value.emailId,
          aadhaarNo: this.basicDetailsForm.value.aadharNo,
          address: this.basicDetailsForm.controls['address'].value.addressLine1,
          pinCode: this.basicDetailsForm.controls['address'].value.pincode,
          country: this.basicDetailsForm.controls['address'].value.country,
          state: this.basicDetailsForm.controls['address'].value.state,
          district: this.basicDetailsForm.controls['address'].value.district,
          highSchoolRollNo: this.educationalDetailsForm.controls['highSchoolDocuments'].value.rollNo,
          highSchoolYearOfPassing: this.educationalDetailsForm.controls['highSchoolDocuments'].value.yearOfPassing,
          intermediateRollNo: this.educationalDetailsForm.controls['intermediateDocuments'].value.rollNo,
          intermediateYearOfPassing: this.educationalDetailsForm.controls['intermediateDocuments'].value.yearOfPassing,
          highSchoolMarksheet:this.educationalDetailsForm.controls['highSchoolDocuments'].value.marksSheet,
          highSchoolCertificate: this.educationalDetailsForm.controls['highSchoolDocuments'].value.certificate,
          intermediateMarksheet:this.educationalDetailsForm.controls['intermediateDocuments'].value.marksSheet,
          intermediateCertificate: this.educationalDetailsForm.controls['intermediateDocuments'].value.certificate,
        }
        const formData = new FormData();
        for (let [key, value] of Object.entries(request)) {
          formData.append(`${key}`, `${value}`)
          }
        this.baseService.updateEnrollmentDetails(formData, this.enrollmentId).subscribe({
          next: (res) => {
            const dialogRef = this.dialog.open(ConformationDialogComponent, {
              data: {
                dialogType: 'success',
                description: ['Your Student Enrollment Application Updated Successfully'],
                buttons: [
                  {
                    btnText: 'Ok',
                    positionClass: 'center',
                    btnClass: 'btn-full',
                    response: true,
                  },
                ],
              },
              width: '700px',
              height: '400px',
              maxWidth: '90vw',
              maxHeight: '90vh'
            })
            dialogRef.afterClosed().subscribe(res => {
              this.router.navigate(['/student-enrollment/institute']);
            })
          },
          error: (error: HttpErrorResponse) => {
              
          }
        })
      }
    }
    
  }
