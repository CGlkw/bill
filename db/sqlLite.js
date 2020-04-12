const db_path = '_doc/bill.db'
const db_name = 'bill_dev'

const bill_table = 'create table if not exists bill(id int primary key not null,name text,pwd text)'

// 打开数据库
function openDB(){
	return new Promise((reslove,reject) => {
		plus.sqlite.openDatabase({
			name: db_name,
			path: db_path,
			success: function(e){
				console.log('openDatabase success!');
				reslove(e)
			},
			fail: function(e){
				console.log('openDatabase failed: '+JSON.stringify(e));
				reject(e)
			}
		});
	})
}

// 关闭数据库
function closeDB(){
	return new Promise((reslove,reject) => {
		plus.sqlite.closeDatabase({
			name: 'first',
			success: function(e){
				console.log('closeDatabase success!');
				reslove(e)
			},
			fail: function(e){
				console.log('closeDatabase failed: '+JSON.stringify(e));
				reject(e)
			}
		});
	})
	
}