'use strict';

module.exports = function(app , mongoose)
{
	require('./server/schema/user')(app , mongoose);
	require('./server/schema/strengths')(app , mongoose);
	require('./server/schema/weak')(app , mongoose);
	require('./server/schema/opport')(app , mongoose);
	require('./server/schema/threats')(app , mongoose);
	require('./server/schema/biz')(app , mongoose);
	require('./server/schema/objs')(app , mongoose);
	require('./server/schema/strategy')(app , mongoose);
	require('./server/schema/target')(app , mongoose);
	require('./server/schema/org')(app , mongoose);
	require('./server/schema/bens')(app , mongoose);
	require('./server/schema/cust')(app , mongoose);
	require('./server/schema/compe')(app , mongoose);
	require('./server/schema/caps')(app , mongoose);
	require('./server/schema/procs')(app , mongoose);
	require('./server/schema/policy')(app , mongoose);
	require('./server/schema/inno')(app , mongoose);
	require('./server/schema/tasks')(app , mongoose);
	require('./server/schema/report')(app , mongoose);
	require('./server/schema/avatar')(app , mongoose);
	require('./server/schema/story')(app , mongoose);
	/*
	require('./server/schema/objs')(app , mongoose);
	require('./server/schema/challenge')(app , mongoose);
	require('./server/schema/counter')(app , mongoose);
	require('./server/schema/innovation')(app , mongoose);
	require('./server/schema/product')(app , mongoose);
	require('./server/schema/swot')(app , mongoose);
	require('./server/schema/org')(app , mongoose);*/
};