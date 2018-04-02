export default {
  Query: {
    getCompanies: async (parent, _, { Company }) => {
      try {
        const companies = await Company.find()
        return companies
      } catch (error) {
        return error
      }
    },
    getCompany: async (parent, args, { Company }) => {
      try {
        const company = await Company.findOne(args)
        return company
      } catch (error) {
        return error
      }
    },
    getEmployee: async (parent, { userID }, { Employee }) => {
      try {
        const employee = await Employee.findById(userID.id)
        employee._id = employee._id.toString()
        return employee.company === userID.company
          ? employee
          : { error: 'wrong company' }
      } catch (error) {
        return error
      }
    },
    getEmployees: async (parent, args, { Employee }) => {
      try {
        const employees = await Employee.find(args)
        return employees.map(x => {
          x._id = x._id.toString()
          return x
        })
      } catch (error) {
        return error
      }
    },
    getSurveys: async (parent, args, { Survey }) => {
      try {
        const surveys = await Survey.find(args)
        return surveys
      } catch (error) {
        return error
      }
    },
    getSurvey: async (parent, args, { Survey }) => {
      try {
        const survey = await Survey.findOne(args)
        return survey
      } catch (error) {
        return error
      }
    },
    getResults: async (parent, args, { Results }) => {
      try {
        const results = await Results.find(args)
        return results
      } catch (error) {
        return error
      }
    },
    getResult: async (parent, args, { Results }) => {
      try {
        const Result = await Results.find(args)
        return Result
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    createCompany: async (parent, args, { Company }) => {
      const company = await new Company(args).save()
      return company
    },
    editCompany: async (parent, args, { Company }) => {
      try {
        const company = await Company.findOneAndUpdate(
          { name: args.companyName },
          { group: args.group }
        )
        return company
      } catch (error) {
        console.log(`this is an error: ${error}`)
        return error
      }
    },
    removeCompany: async (parent, { companyName }, { Company }) => {
      try {
        const removedCompany = await Company.findOneAndRemove({ companyName })
        return removedCompany
      } catch (error) {
        return error
      }
    },
    createEmployee: async (parent, args, { Employee }) => {
      const existing = await Employee.findOne({ email: args.email })
      if (existing) throw new Error('Email in use')
      const person = await new Employee(args).save()
      person._id = person._id.toString()
      return person
    },
    editEmployee: async (parent, args, { Employee }) => {
      try {
        const person = await Employee.findById(args.id)
        delete args.id
        person.set(args)
        await person.save()
        return person
      } catch (error) {
        console.log(`this is an error: ${error}`)
        return error
      }
    },
    removeEmployee: async (parent, { id }, { Employee }) => {
      try {
        await Employee.findByIdAndRemove(id)
        return { _id: `Removed ${id}` }
      } catch (error) {
        return error
      }
    },
    createSurvey: async (parent, args, { Survey }) => {
      const survey = await new Survey(args).save()
      return survey
    },
    editSurvey: async (parent, args, { Survey }) => {
      try {
        const survey = await Survey.findOneAndUpdate(args)
        return survey
      } catch (error) {
        console.log(`this is an error: ${error}`)
        return error
      }
    },
    removeSurvey: async (parent, args, { Survey }) => {
      try {
        await Survey.findOneAndRemove(args, (err, res) => {
          if (err) throw new Error(err)
        })
        return { surveyName: `Removed ${args.surveyName}` }
      } catch (error) {
        return error
      }
    },
    createResult: async (parent, args, { Result }) => {
      const date = Date.now()
      const result = await new Result({ date, ...args }).save()
      return result
    }
  }
}
