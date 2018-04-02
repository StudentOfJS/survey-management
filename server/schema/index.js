export default `
  type Pages {
    p1: String
    p2: String
    p3: String
    p4: String
    p5: String
    p6: String
  }

  type Employee {
    _id: String
    companyName: String
    firstName: String
    lastName: String
    email: String
    mobile: String
    manager: String
    groupMembership: [String]
    dashboardAccess: Boolean
    surveyName: String
    surveyOwed: Boolean
    firstTime: Boolean
  }

  type Survey {
    surveyName: String!
    companyName: String!
    introPage1: String!
    introPage2: String!
    subHeading: Pages!
    start: Pages!
    end: Pages!
    }

  type Company {
    companyName: String!
    groups: [String]
  }

  type Result {
    email: String
    mobile: String
    participant: String
    manager: String
    group: String
    companyName: String
    surveyName: String
    date: String
    p1: Int
    p2: Int
    p3: Int
    p4: Int
    p5: Int
    p6: Int
  }

  input EmployeeId {
    companyName: String!
    id: String!
  }

  input PagesInput {
    p1: String
    p2: String
    p3: String
    p4: String
    p5: String
    p6: String
  }

  type Query {

    getEmployees(companyName: String): [Employee]!

    getEmployee(userID: EmployeeId):  Employee!

    getCompanies: [Company]

    getCompany(companyName: String!): Company!

    getSurvey(surveyName: String!): Survey!

    getSurveys(companyName: String!): [Survey]!

    getResult(
      surveyName: String!
      email: String!
    ): [Result]!

    getResults(companyName: String!): [Result]!


  }


  type Mutation {
    createCompany(companyName: String! groups: [String]) : Company!

    editCompany(companyName: String! groups: [String]) : Company!

    removeCompany(companyName: String!) : Company!

    createEmployee(
      companyName: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      mobile: String!
      manager: String
      groupMembership: [String]
      dashboardAccess: Boolean!
      surveyName: String
      surveyOwed: Boolean
      firstTime: Boolean
    ): Employee!

    editEmployee(
      id: String!
      companyName: String!
      firstName: String!
      lastName: String!
      email: String!
      mobile: String!
      manager: String
      groupMembership: [String]
      dashboardAccess: Boolean!
      surveyName: String
      surveyOwed: Boolean
      firstTime: Boolean
    ): Employee!

    removeEmployee(id: String!): Employee

    createSurvey(
      surveyName: String!
      companyName: String!
      introPage1: String!
      introPage2: String!
      subHeading: PagesInput!
      start: PagesInput!
      end: PagesInput!
    ) : Survey!

    editSurvey(
      surveyName: String!
      companyName: String!
      introPage1: String
      introPage2: String
      subHeading: PagesInput
      start: PagesInput
      end: PagesInput
    ) : Survey!

    removeSurvey(surveyName: String! companyName: String!) : Survey

    createResult(
      email: String
      mobile: String
      participant: String
      manager: String
      group: String
      companyName: String
      surveyName: String
      p1: Int
      p2: Int
      p3: Int
      p4: Int
      p5: Int
      p6: Int
    ) : Result!
  }
`
