const createRequest = async (url, method, data = {}, headers = {}) => {
  try {
    let response;
    const isGetMethod = method === 'allTickets'
      || method.startsWith('delete')
      || method.startsWith('ticket');

    switch (method) {
      case 'createTicket':
        response = await fetch(`${url}?method=${method}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        });
        break;

      case 'updateById':
        if (!data.id) {
          console.error('ID is required for updateById method'); // eslint-disable-line no-console
          return null;
        }
        response = await fetch(`${url}?method=${method}&id=${data.id}`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        });
        break;

      case 'allTickets':
      case 'ticketById':
      case 'deleteById': {
        if (isGetMethod && method !== 'allTickets' && !data.id) {
          console.error('ID is required for ticketById and deleteById methods'); // eslint-disable-line no-console
          return null;
        }

        const queryString = new URLSearchParams(
          isGetMethod ? data : {},
        ).toString();
        response = await fetch(
          `${url}?method=${method}${queryString ? `&${queryString}` : ''}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
          },
        );
        break;
      }

      default:
        console.error('Unsupported method:', method); // eslint-disable-line no-console
        return null;
    }

    if (response.ok) {
      return method === 'deleteById' ? 'success' : await response.json();
    }

    console.error(`Server error: ${response.statusText}`); // eslint-disable-line no-console
    return null;
  } catch (error) {
    console.error('Network error:', error); // eslint-disable-line no-console
    return null;
  }
};

export default createRequest;

// const createRequest = async (url, method, data = {}, headers = {}) => {
//   try {
//     let response;
//     const isGetMethod = method === 'allTickets'
//       || method.startsWith('delete')
//       || method.startsWith('ticket');

//     switch (method) {
//       case 'createTicket':
//         response = await fetch(`${url}?method=${method}`, {
//           method: 'POST',
//           body: JSON.stringify(data),
//           headers: {
//             'Content-Type': 'application/json',
//             ...headers,
//           },
//         });
//         break;

//       case 'updateById':
//         if (!data.id) {
//           console.error('ID is required for updateById method');// eslint-disable-line no-console
//           return null;
//         }
//         response = await fetch(`${url}?method=${method}&id=${data.id}`, {
//           method: 'POST',
//           body: JSON.stringify(data),
//           headers: {
//             'Content-Type': 'application/json',
//             ...headers,
//           },
//         });
//         break;

//       case 'allTickets':
//       case 'ticketById':
//       case 'deleteById': {
//         if (isGetMethod && method !== 'allTickets' && !data.id) {
//           console.error('ID is required for ticketById and deleteById methods');// eslint-disable-line no-console
//           return null;
//         }

//         const queryString = new URLSearchParams(
//           isGetMethod ? data : {},
//         ).toString();
//         response = await fetch(
//           `${url}?method=${method}${queryString ? `&${queryString}` : ''}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               ...headers,
//             },
//           },
//         );
//         break;
//       }

//       default:
//         console.error('Unsupported method:', method);// eslint-disable-line no-console
//         return null;
//     }

//     if (response.ok) {
//       return method === 'deleteById' ? 'success' : await response.json();
//     }

//     console.error(`Server error: ${response.statusText}`);// eslint-disable-line no-console
//     return null;
//   } catch (error) {
//     console.error('Network error:', error); // eslint-disable-line no-console
//     return null;
//   }
// };

// export default createRequest;
