const payLoad = (dataSource) => {
    const communities = [];
    const addresses = [];
    const mappedCommunities = {}
    const refinedData = dataSource.reduce((acc, curr) => {
    const obj = {};
    obj['JobNumber'] = `${curr.ProjectNumber}-${curr.JobNumber}`;
    obj['ProjectName'] = curr.ProjectName;
    obj['Address'] = `${curr.AddressNumber} ${curr.AddressStreet}`;
    obj['Plan'] = `${curr.PlanNumber}-${curr.PlanName}`;
    obj['Elevation'] = curr.PlanElevationNumber;
    obj['PurchaserName'] = curr.PurchaserName;
    obj['SalesPrice'] = curr.SalesPrice 
    obj['JobID'] = curr.JobID 
    obj['City'] = curr.City 
    obj['Zip'] = curr.Zip 
    obj['State'] = curr.State 
    obj['County'] = curr.County

    acc.push(obj)
    
    if(!communities.includes(curr.ProjectName)){
      communities.push(curr.ProjectName);
    }
    
     if(!addresses.includes((`${curr.AddressNumber} ${curr.AddressStreet}` ))){
      addresses.push(`${curr.AddressNumber} ${curr.AddressStreet}`)
    }
    
    if(!mappedCommunities[curr.ProjectName]){
      mappedCommunities[curr.ProjectName] = [`${curr.AddressNumber} ${curr.AddressStreet}`];
    }else{
      mappedCommunities[curr.ProjectName].push(`${curr.AddressNumber} ${curr.AddressStreet}`)
    }
     
    return acc;
  }, [] );
  
  return{
    communities, addresses, mappedCommunities, refinedData
  }
  
};


export default payLoad;