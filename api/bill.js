import billType from '@/jsondata/billType.json'
import bill from '@/jsondata/bill.json'



export function getBillType(){
	return new Promise((reslove,reject) => {
		reslove(billType)
	})
}

export function getBill(data){
	return new Promise((reslove,reject) => {
		const pageNum = data.pageNum || 1
		const pageSize = data.pageSize || 10
		const total = bill.length
		
		let start = (pageNum - 1) * pageSize
		let end = pageNum * pageSize
		
		start = start > total? total:start
		end = end > total? total+ 1:end
		
		const result = bill.filter((value,index) => {
			return index >= start && index < end
		})
		
		reslove(result)
	})
}