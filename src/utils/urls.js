export const path = process.env.REACT_APP_APIURL;
export const domain = process.env.REACT_APP_DOMAIN;

export const studentLogin = `${path}/api/students/login`;

export const tutorLogin = `${path}/api/tutors/login`;

export const studentSignup = `${path}/api/students/register`;

export const tutorSignup = `${path}/api/tutors/register`;

export const postOrGetDoubts = `${path}/api/doubts`;

export const getStudentDoubts = (
  studendId,
  subject,
  status,
  language,
  sortBy
) =>
  `${path}/api/doubts/students/${studendId}?subject=${subject}&language=${language}&status=${status}&sort=${sortBy}`;

export const getTutorDoubts = (tutorId, status, sortBy) =>
  `${path}/api/doubts/tutors/${tutorId}?&status=${status}&sort=${sortBy}`;

export const getAllPendingDoubts = (subject, grade, language, sortBy) =>
  `${path}/api/doubts/pending?subject=${subject}&language=${language}&class_grade=${grade}&sort=${sortBy}`;

export const addTutorToDoubts = (doubtId) =>
  `${path}/api/doubts/${doubtId}/add-tutor`;
