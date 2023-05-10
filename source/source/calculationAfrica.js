function calculationAfrica() {

    let positionSalary = parseFloat(document.getElementById('positionSalary').value)
    let percentHarmCond = parseFloat(document.getElementById('percentHarmCond').value) / 100
    let percentOther1 = parseFloat(document.getElementById('percentOther1').value) / 100
    let percentOther2 = parseFloat(document.getElementById('percentOther2').value) / 100
    let percentEnglish = parseFloat(document.getElementById('percentEnglish').value) / 100
    let percentComplexity = parseFloat(document.getElementById('percentComplexity').value) / 100
    let percentStimulating = parseFloat(document.getElementById('percentStimulating').value) / 100
    let personalBonus = parseFloat(document.getElementById('personalBonus').value)
    let forFlyingHours = parseFloat(document.getElementById('forFlyingHours').value)
    let percentSeason = parseFloat(document.getElementById('percentSeason').value) / 100
    let percent4Month = parseFloat(document.getElementById('percent4Month').value) / 100
    let percent5Month = parseFloat(document.getElementById('percent5Month').value) / 100
    let dailyAllowanceUSD = document.getElementById("dailyAllowanceUSD").value

    let resultHarmCond = positionSalary * percentHarmCond
    let outputResultHarmCond = document.getElementById('outputResultHarmCond')
    outputResultHarmCond.innerHTML = resultHarmCond.toFixed(2)

    let resultOther1 = positionSalary * percentOther1
    let outputResultOther1 = document.getElementById('outputResultOther1')
    outputResultOther1.innerHTML = resultOther1.toFixed(2)

    let resultOther2 = positionSalary * percentOther2
    let outputResultOther2 = document.getElementById('outputResultOther2')
    outputResultOther2.innerHTML = resultOther2.toFixed(2)

    let garanteePayment = positionSalary + resultHarmCond + resultOther1 + resultOther2
    let outputGaranteePayment = document.getElementById('outputGaranteePayment')
    outputGaranteePayment.innerHTML = garanteePayment.toFixed(2)

    let resultEnglish = garanteePayment * percentEnglish
    let outputResultEnglish = document.getElementById('outputResultEnglish')
    outputResultEnglish.innerHTML = resultEnglish.toFixed(2)

    let resultComplexity = garanteePayment * percentComplexity
    let outputResultComplexity = document.getElementById('outputResultComplexity')
    outputResultComplexity.innerHTML = resultComplexity.toFixed(2)

    let resultStimulating = garanteePayment * percentStimulating
    let outputResultStimulating = document.getElementById('outputResultStimulating')
    outputResultStimulating.innerHTML = resultStimulating.toFixed(2)

    let totalBonus = resultEnglish + resultComplexity + resultStimulating + personalBonus + forFlyingHours
    let outputTotalBonus = document.getElementById('outputTotalBonus')
    outputTotalBonus.innerHTML = totalBonus.toFixed(2)

    let totalSalary = (garanteePayment + totalBonus)/100*87
    let outputTotalSalary = document.getElementById('outputTotalSalary')
    outputTotalSalary.innerHTML = totalSalary.toFixed(2)

    let resultSeason = (garanteePayment * percentSeason)/100*87
    let outputResultSeason = document.getElementById('outputResultSeason')
    outputResultSeason.innerHTML = resultSeason.toFixed(2)

    let result4Month = (garanteePayment * percent4Month)/100*87
    let outputResult4Month = document.getElementById('outputResult4Month')
    outputResult4Month.innerHTML = result4Month.toFixed(2)

    let result5Month = (garanteePayment * percent5Month)/100*87
    let outputResult5Month = document.getElementById('outputResult5Month')
    outputResult5Month.innerHTML = result5Month.toFixed(2)

    const currency2022 = [76.5947, 77.1694, 103.4700, 77.8992, 63.3127, 57.1786, 58.2214, 60.3919, 59.8215, 61.1158, 60.8530, 65.8150]
    const currency2023 = [68.8760, 72.7828, 76.0353, 80.9955, 81.3256, 82.6511, 83.5124, 82.8523, 81.2301, 80.3425, 81.0523, 85.3541]
    const currency2024 = [80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000, 80.0000]
   
    let startDate = moment(document.getElementById('startDate').value)
    let endDate = moment(document.getElementById('endDate').value)
   
    let date1 = new Date(document.getElementById('startDate').value)
    let date2 = new Date(document.getElementById('endDate').value)

    let monthsCount = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth())
    let currentYear = date1.getFullYear()
    let firstMonthIndex = startDate.month()

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const monthBonusNames = ['Май', 'Июнь', 'Июль', 'Август', 'Сентябрь']
    const table = document.querySelector('#resultTable')
    const sumTable = document.querySelector('#sumTable')
    
    const newSumRow = document.createElement('tr')
    const textCell = document.createElement('td')
    const sumCell = document.createElement('td')
    table.innerHTML = ''
    sumTable.innerHTML = ''
    let sum = 0

    for (let i = 0; i <= monthsCount; i++) {

        let nextMonth = moment(startDate).add(i, 'months')
        let daysInMonth = nextMonth.daysInMonth()
        
        let daysInFirstPart = startDate.date()
        let daysToEndOfMonth = daysInMonth - nextMonth.date()
        let daysToEndLastMonth = endDate.date() - daysInFirstPart
        
        let monthIndex = (firstMonthIndex + i) % 12
        let monthName = monthNames[monthIndex]
        let isSeasonBonusMonth = monthBonusNames.includes(monthName)
        let isLastMonth = i === monthsCount
        let currency = currency2024

        const newRow = document.createElement('tr')
        const monthCell = document.createElement('td')
        const totalCell = document.createElement('td')
        
        if (i != 0 && monthName === 'Январь') {
            currentYear += 1
        } 

        if (currentYear === 2022) {
            currency = currency2022
        } else if (currentYear === 2023) {
            currency = currency2023
        }

        let dailyAllowanceRub = dailyAllowanceUSD*currency[monthIndex]
        let salary = totalSalary/daysInMonth + dailyAllowanceRub
                        
        if (isSeasonBonusMonth) {
            salary += resultSeason/daysInMonth
        }

        let salaryTotal = salary * daysInMonth
        
        if (!isLastMonth) {
            if (i === 0) {
                salaryTotal = salary * (daysToEndOfMonth + 1)   
            } else if (i === 3) {
                salaryTotal += result4Month / daysInMonth * daysToEndOfMonth
            } else if (i === 4) {
                salaryTotal += (result4Month / daysInMonth * daysInFirstPart) + (result5Month / daysInMonth * daysToEndOfMonth)
            } else if (i >= 5) {
                salaryTotal += result5Month / daysInMonth * daysInMonth
            }

        } else {

            salaryTotal = salary * endDate.date() //Проверить

            if (i === 0) {
                salaryTotal = salary * (daysToEndLastMonth + 1)
            } else if (i === 3 && daysToEndLastMonth > 0) {
                salaryTotal += result4Month / daysInMonth * daysToEndLastMonth
            } else if (i === 4) {
                if (daysToEndLastMonth > 0) {
                salaryTotal += (result4Month / daysInMonth * daysInFirstPart) + (result5Month / daysInMonth * daysToEndLastMonth)
                } else {
                salaryTotal += result4Month / daysInMonth * endDate.date()    
                }
            } else if (i >= 5) {
                salaryTotal += result5Month / daysInMonth * endDate.date()
            }

        }

        monthCell.textContent = `${monthName} ${currentYear}`
        newRow.appendChild(monthCell)
        monthCell.style.textAlign = 'center'
        monthCell.style.width = '50%'
        totalCell.textContent = salaryTotal.toFixed(2)
        totalCell.style.textAlign = 'center'
        newRow.appendChild(totalCell)
        table.appendChild(newRow)
        sum += salaryTotal

    }
    
    textCell.textContent = `Сумма за всё: `
    textCell.style.fontWeight = 'bold'
    textCell.style.textAlign = 'center'
    textCell.style.width = '50%'
    sumCell.textContent = sum .toFixed(2)
    newSumRow.appendChild(textCell)
    sumCell.style.textAlign = 'center'
    sumCell.style.fontWeight = 'bold'
    newSumRow.appendChild(sumCell)
    table.appendChild(newSumRow)

}