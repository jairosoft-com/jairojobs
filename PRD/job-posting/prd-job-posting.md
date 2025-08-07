# PRD: Job Posting Management

## 1. Introduction/Overview
This document outlines the requirements for the Job Posting Management feature, enabling employers to create, edit, and manage job listings. This feature is essential for attracting qualified candidates and maintaining up-to-date job opportunities on the platform.

## 2. Goals
1. Provide an intuitive interface for creating job postings
2. Support various job types and requirements
3. Enable efficient management of job listings
4. Ensure job postings meet quality standards
5. Provide visibility into posting performance

## 3. User Stories
1. As an employer, I want to create a new job posting to attract candidates
2. As a hiring manager, I want to edit or update job details
3. As an HR representative, I want to duplicate existing postings for similar roles
4. As a recruiter, I want to preview how the job will appear to candidates
5. As an account administrator, I want to manage posting permissions for team members

## 4. Functional Requirements
1. **Job Posting Creation**
   - Job title and description (rich text editor)
   - Job type (full-time, part-time, contract, etc.)
   - Location (with remote work options)
   - Department and team
   - Required qualifications and skills
   - Salary range and benefits
   - Application deadline
   - Application instructions
   
2. **Job Posting Management**
   - Draft, publish, and close postings
   - Duplicate existing postings
   - Extend posting duration
   - View posting status and metrics
   - Export applicant data
   
3. **Approval Workflow**
   - Draft review process
   - Approval notifications
   - Revision history
   - Posting expiration and renewal

## 5. Non-Goals (Out of Scope)
1. Advanced A/B testing of job descriptions
2. Automated job description generation
3. Integration with external ATS/HRIS systems
4. Advanced analytics and reporting

## 6. Design Considerations
1. **Form Design:**
   - Step-by-step posting wizard
   - Progress indicator
   - Real-time validation
   - Preview mode
   - Save as draft functionality
   
2. **Dashboard:**
   - Overview of all job postings
   - Status indicators
   - Quick actions
   - Performance metrics

## 7. Technical Considerations
1. Rich text editor with formatting options
2. Input validation for all fields
3. Auto-save functionality
4. Version control for job postings
5. Permission-based access control
6. Audit logging of all changes

## 8. Success Metrics
1. Time to create a new job posting
2. Number of applications per posting
3. Posting completion rate
4. Time to fill positions
5. Employer satisfaction with posting process

## 9. Open Questions
1. Should we implement a job description template library?
2. What is the maximum duration for a job posting?
3. Should we allow HTML in job descriptions?
4. How many job postings can an employer have active at once?
