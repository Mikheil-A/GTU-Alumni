import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { StudentsService } from '../../../../public/services/students.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnChanges {
  @Input() userInfo: object;
  @Input() canEdit: boolean;

  @Output() onProfilePictureUpload = new EventEmitter<any>();

  constructor(private _studentsService: StudentsService) {}

  ngOnChanges() {
    // console.log(this.userInfo);
  }

  onFileUpload(e: Event) {
    this._getBase64(e.target['files'][0]);
  }

  private _getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this._upload(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  private _upload(base64File) {
    const requestData: object = {
      id: localStorage.getItem('user_id'),
      image_base64: base64File,
    };
    this._studentsService.uploadProfilePhoto(requestData).subscribe(() => {
      this.onProfilePictureUpload.emit({});
    });
  }
}
