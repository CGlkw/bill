import billType from '@/jsondata/billType.json'
import bill from '@/jsondata/bill.json'
import moment from 'moment'

import { insertBillTable,selectAllBillTable } from '@/db/bill_table.js'
import { selectAllBillTypeTable,insertBillTypeTable } from '@/db/bill_type_table.js'


export function getBillType(){
	// #ifdef APP-PLUS 
	return selectAllBillTypeTable()
	// #endif
	
	// #ifndef APP-PLUS 
	return new Promise((reslove,reject) => {
		reslove(billType)
	})
	// #endif
}

export function getBillChartDate(data){
	return new Promise((reslove,reject) => {
		let startTime = data.startTime;
		let endTime = data.endTime;
		// #ifndef APP-PLUS 
		let startDate = startTime !== undefined ? moment(startTime, "YYYY-MM-DD") : undefined;
		let endDate = endTime !== undefined ? moment(endTime, "YYYY-MM-DD") : undefined;
		
		
		const result = bill.filter((value,index) => {
			let time = value.time;
			let timeDate = moment(time, "YYYY-MM-DD")
			if(startDate === undefined && endDate !== undefined){
				return timeDate < endDate
			}else if(startDate !== undefined && endDate === undefined){
				return timeDate >= startDate
			}else if (startDate !== undefined && endDate !== undefined){
				return timeDate >= startDate && timeDate < endDate
			}else{
				return true
			}
		})
		
		reslove(result)
		// #endif
		
		// #ifdef APP-PLUS 
		selectAllBillTable({startDate: startTime, endDate: endTime}).then(data => {
			reslove(data)
		}).catch(e => {
			reject(e)
		})
		// #endif
	})
}

export function getBill(data){
	return new Promise((reslove,reject) => {
		const pageNum = data.pageNum || 1
		const pageSize = data.pageSize || 10
		// #ifndef APP-PLUS 
		const total = bill.length
		
		let start = (pageNum - 1) * pageSize
		let end = pageNum * pageSize
		
		start = start > total? total:start
		end = end > total? total+ 1:end
		
		const result = bill.filter((value,index) => {
			return index >= start && index < end
		})
		
		reslove(result)
		// #endif
		
		// #ifdef APP-PLUS 
		let start = (pageNum - 1) * pageSize
		selectAllBillTable({start: start, size: pageSize}).then(data => {
			reslove(data)
		}).catch(e => {
			reject(e)
		})	
		// #endif
	})
}